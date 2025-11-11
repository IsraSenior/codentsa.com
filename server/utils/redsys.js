import CryptoJS from 'crypto-js'

/**
 * Redsys Helper Utility
 * Handles all Redsys payment gateway operations including signature generation and validation
 */

export class RedsysHelper {
  constructor(config = {}) {
    this.merchantCode = config.merchantCode || process.env.REDSYS_MERCHANT_CODE || '999008881'
    this.terminal = config.terminal || process.env.REDSYS_TERMINAL || '001'
    this.secretKey = config.secretKey || process.env.REDSYS_SECRET_KEY || 'sq7HjrUOBfKmC576ILgskD5srU870gJ7'
    this.environment = config.environment || process.env.REDSYS_ENVIRONMENT || 'sandbox'
    this.currency = config.currency || process.env.REDSYS_CURRENCY || '978' // EUR
  }

  /**
   * Get Redsys URL based on environment
   */
  getRedsysUrl() {
    return this.environment === 'production'
      ? 'https://sis.redsys.es/sis/realizarPago'
      : 'https://sis-t.redsys.es:25443/sis/realizarPago'
  }

  /**
   * Create merchant parameters for Redsys
   * @param {Object} orderData - Order information
   * @returns {string} Base64 encoded parameters
   */
  createMerchantParameters(orderData) {
    const {
      orderId,
      amount, // Amount in cents (12.50€ = 1250)
      customerEmail,
      productDescription = 'Compra en Codentsa',
      successUrl,
      errorUrl,
    } = orderData

    const parameters = {
      DS_MERCHANT_AMOUNT: amount.toString(),
      DS_MERCHANT_ORDER: orderId,
      DS_MERCHANT_MERCHANTCODE: this.merchantCode,
      DS_MERCHANT_CURRENCY: this.currency,
      DS_MERCHANT_TRANSACTIONTYPE: '0', // Authorization
      DS_MERCHANT_TERMINAL: this.terminal,
      DS_MERCHANT_MERCHANTURL: `${process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/redsys/notification`,
      DS_MERCHANT_URLOK: successUrl,
      DS_MERCHANT_URLKO: errorUrl,
      DS_MERCHANT_CONSUMERLANGUAGE: '001', // Spanish
      DS_MERCHANT_PRODUCTDESCRIPTION: productDescription,
      DS_MERCHANT_TITULAR: customerEmail,
    }

    // Convert to JSON and encode in Base64
    const parametersJson = JSON.stringify(parameters)
    const parametersBase64 = Buffer.from(parametersJson).toString('base64')

    return parametersBase64
  }

  /**
   * Create HMAC-SHA256 signature for Redsys
   * @param {string} merchantParametersBase64 - Base64 encoded parameters
   * @param {string} orderId - Order ID
   * @returns {string} Base64 encoded signature
   */
  createSignature(merchantParametersBase64, orderId) {
    // Decode secret key from Base64
    const secretKeyDecoded = CryptoJS.enc.Base64.parse(this.secretKey)

    // Create key with 3DES encryption using order ID
    const iv = CryptoJS.enc.Hex.parse('0000000000000000')
    const cipher = CryptoJS.TripleDES.encrypt(orderId, secretKeyDecoded, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding,
    })
    const cipherKey = cipher.ciphertext

    // Create HMAC-SHA256 signature
    const signature = CryptoJS.HmacSHA256(merchantParametersBase64, cipherKey)

    // Encode signature in Base64
    const signatureBase64 = CryptoJS.enc.Base64.stringify(signature)

    return signatureBase64
  }

  /**
   * Verify signature from Redsys response
   * @param {string} merchantParametersBase64 - Base64 parameters from response
   * @param {string} signatureReceived - Signature from response
   * @returns {boolean} True if signature is valid
   */
  verifySignature(merchantParametersBase64, signatureReceived) {
    try {
      // Decode parameters to get order ID
      const parametersJson = Buffer.from(merchantParametersBase64, 'base64').toString('utf-8')
      const parameters = JSON.parse(parametersJson)
      const orderId = parameters.Ds_Order || parameters.DS_ORDER

      if (!orderId) {
        console.error('Order ID not found in parameters')
        return false
      }

      // Calculate expected signature
      const expectedSignature = this.createSignature(merchantParametersBase64, orderId)

      // Compare signatures
      return expectedSignature === signatureReceived
    } catch (error) {
      console.error('Error verifying signature:', error)
      return false
    }
  }

  /**
   * Decode Redsys response parameters
   * @param {string} merchantParametersBase64 - Base64 encoded response
   * @returns {Object} Decoded parameters
   */
  decodeResponse(merchantParametersBase64) {
    try {
      const parametersJson = Buffer.from(merchantParametersBase64, 'base64').toString('utf-8')
      return JSON.parse(parametersJson)
    } catch (error) {
      console.error('Error decoding response:', error)
      return null
    }
  }

  /**
   * Generate unique order ID
   * Format: YYYYMMDDHHMMSS + random (max 12 chars alphanumeric)
   * @returns {string} Unique order ID
   */
  static generateOrderId() {
    const timestamp = new Date().toISOString().replace(/[-:T.Z]/g, '').substring(0, 14)
    const random = Math.random().toString(36).substring(2, 8).toUpperCase()
    return `${timestamp}${random}`.substring(0, 12)
  }

  /**
   * Parse Redsys response code
   * @param {string} code - Response code from Redsys
   * @returns {Object} Status and message
   */
  static parseResponseCode(code) {
    const codeNum = parseInt(code, 10)

    if (codeNum >= 0 && codeNum <= 99) {
      return {
        status: 'success',
        message: 'Transacción autorizada',
      }
    }

    const errorMessages = {
      101: 'Tarjeta caducada',
      102: 'Tarjeta en excepción transitoria o bajo sospecha de fraude',
      104: 'Operación no permitida para esa tarjeta o terminal',
      106: 'Intentos de PIN excedidos',
      107: 'El módulo de control de tarjetas ha contactado con el emisor',
      109: 'Comercio o terminal no válido',
      110: 'Importe no válido',
      116: 'Disponible insuficiente',
      118: 'Tarjeta no registrada',
      125: 'Tarjeta no efectiva',
      129: 'Código de seguridad (CVV2/CVC2) incorrecto',
      167: 'Sospecha de fraude',
      180: 'Tarjeta no válida',
      184: 'Error en la autenticación del titular',
      190: 'Denegación sin especificar motivo',
      191: 'Fecha de caducidad errónea',
      202: 'Tarjeta en excepción transitoria o bajo sospecha de fraude',
      904: 'Comercio no registrado en FUC',
      909: 'Error de sistema',
      913: 'Pedido repetido',
      944: 'Sesión incorrecta',
      950: 'Operación de devolución no permitida',
    }

    return {
      status: 'error',
      message: errorMessages[codeNum] || 'Error desconocido',
      code: codeNum,
    }
  }

  /**
   * Format amount for Redsys (convert to cents)
   * @param {number} amount - Amount in euros
   * @returns {number} Amount in cents
   */
  static formatAmount(amount) {
    return Math.round(amount * 100)
  }

  /**
   * Parse amount from Redsys (convert to euros)
   * @param {string|number} amountCents - Amount in cents
   * @returns {number} Amount in euros
   */
  static parseAmount(amountCents) {
    return parseFloat(amountCents) / 100
  }
}

// Export singleton instance
export function useRedsys(config) {
  return new RedsysHelper(config)
}
