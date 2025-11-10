# Integración con Redsys

## Qué es Redsys

Redsys es la pasarela de pagos líder en España, utilizada por la mayoría de bancos españoles. Permite procesar pagos con tarjetas de crédito/débito de forma segura.

**Ventajas:**
- Estándar en España
- Aceptación universal en bancos españoles
- Soporte para Bizum
- PCI-DSS compliant
- Entornos de test y producción

## Requisitos Previos

### 1. Contratar con Redsys

Contactar con tu banco para activar TPV (Terminal Punto de Venta) virtual. Te proporcionarán:
- **Merchant Code** (FUC): Código único de comercio
- **Terminal**: Número de terminal (usualmente "001")
- **Secret Key**: Clave secreta para firmar transacciones

### 2. Documentación Oficial

- [Guía de integración Redsys](https://pagosonline.redsys.es/desarrolladores.html)
- [API REST](https://pagosonline.redsys.es/conexion-insite-RESP-JSON.html)

## Variables de Entorno

```env
# Redsys Configuration
NUXT_REDSYS_MERCHANT_CODE=999008881      # FUC del comercio
NUXT_REDSYS_TERMINAL=001                 # Terminal
NUXT_REDSYS_SECRET_KEY=sq7HjrUOBfKmC576ILgskD5srU870gJ7  # Clave secreta
NUXT_REDSYS_ENVIRONMENT=test             # 'test' o 'production'

# URLs de Redsys
# Test: https://sis-t.redsys.es:25443/sis/realizarPago
# Prod: https://sis.redsys.es/sis/realizarPago
```

## Instalación

```bash
pnpm add crypto-js
```

## Utilidad de Firma Redsys

```javascript
// utils/redsys.js
import CryptoJS from 'crypto-js'

export class RedsysHelper {
  constructor(merchantCode, terminal, secretKey, environment = 'test') {
    this.merchantCode = merchantCode
    this.terminal = terminal
    this.secretKey = secretKey
    this.environment = environment
    this.urls = {
      test: 'https://sis-t.redsys.es:25443/sis/realizarPago',
      production: 'https://sis.redsys.es/sis/realizarPago'
    }
  }

  /**
   * Generar parámetros para Redsys
   */
  createPaymentParams(orderId, amount, currency = '978') {
    // amount debe estar en céntimos (99.99€ = 9999)
    const amountInCents = Math.round(amount * 100)

    const params = {
      DS_MERCHANT_AMOUNT: amountInCents.toString(),
      DS_MERCHANT_ORDER: orderId,
      DS_MERCHANT_MERCHANTCODE: this.merchantCode,
      DS_MERCHANT_CURRENCY: currency, // 978 = EUR
      DS_MERCHANT_TRANSACTIONTYPE: '0', // 0 = Autorización
      DS_MERCHANT_TERMINAL: this.terminal,
      DS_MERCHANT_MERCHANTURL: `${process.env.NUXT_PUBLIC_BASE_URL}/api/redsys/notification`,
      DS_MERCHANT_URLOK: `${process.env.NUXT_PUBLIC_BASE_URL}/checkout/success`,
      DS_MERCHANT_URLKO: `${process.env.NUXT_PUBLIC_BASE_URL}/checkout/error`
    }

    return params
  }

  /**
   * Codificar parámetros en Base64
   */
  encodeParams(params) {
    const jsonParams = JSON.stringify(params)
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(jsonParams))
  }

  /**
   * Generar firma (signature)
   */
  createSignature(encodedParams, orderId) {
    // 1. Decodificar la clave secreta
    const key = CryptoJS.enc.Base64.parse(this.secretKey)

    // 2. Cifrar el orderId con 3DES
    const cipher = CryptoJS.TripleDES.encrypt(orderId, key, {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding,
      iv: CryptoJS.enc.Hex.parse('0000000000000000')
    })

    // 3. Generar HMAC SHA256
    const hash = CryptoJS.HmacSHA256(encodedParams, cipher.ciphertext)

    // 4. Codificar en Base64
    return CryptoJS.enc.Base64.stringify(hash)
  }

  /**
   * Generar formulario completo de pago
   */
  generatePaymentForm(orderId, amount, currency = '978') {
    const params = this.createPaymentParams(orderId, amount, currency)
    const encodedParams = this.encodeParams(params)
    const signature = this.createSignature(encodedParams, orderId)

    return {
      Ds_SignatureVersion: 'HMAC_SHA256_V1',
      Ds_MerchantParameters: encodedParams,
      Ds_Signature: signature,
      url: this.urls[this.environment]
    }
  }

  /**
   * Verificar firma en notificación de Redsys
   */
  verifyNotification(encodedParams, receivedSignature) {
    // Decodificar parámetros
    const decodedParams = JSON.parse(
      CryptoJS.enc.Base64.parse(encodedParams).toString(CryptoJS.enc.Utf8)
    )

    const orderId = decodedParams.Ds_Order

    // Calcular firma esperada
    const expectedSignature = this.createSignature(encodedParams, orderId)

    // Comparar firmas
    return expectedSignature === receivedSignature
  }

  /**
   * Decodificar parámetros de respuesta
   */
  decodeParams(encodedParams) {
    const decoded = CryptoJS.enc.Base64.parse(encodedParams).toString(CryptoJS.enc.Utf8)
    return JSON.parse(decoded)
  }
}
```

## API Endpoints

### Iniciar Pago

```javascript
// server/api/redsys/init-payment.post.js
import { RedsysHelper } from '~/utils/redsys'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const redsys = new RedsysHelper(
    config.redsys.merchantCode,
    config.redsys.terminal,
    config.redsys.secretKey,
    config.redsys.environment
  )

  try {
    // Validar orden existe en base de datos
    const order = await validateOrder(body.orderId)

    if (!order) {
      throw createError({
        statusCode: 404,
        message: 'Order not found'
      })
    }

    // Generar parámetros de pago
    const paymentForm = redsys.generatePaymentForm(
      order.orderNumber,
      order.total,
      '978' // EUR
    )

    return {
      success: true,
      paymentData: paymentForm
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Error initializing payment'
    })
  }
})
```

### Notificación de Redsys (Webhook)

```javascript
// server/api/redsys/notification.post.js
import { RedsysHelper } from '~/utils/redsys'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const redsys = new RedsysHelper(
    config.redsys.merchantCode,
    config.redsys.terminal,
    config.redsys.secretKey,
    config.redsys.environment
  )

  try {
    // Verificar firma
    const isValid = redsys.verifyNotification(
      body.Ds_MerchantParameters,
      body.Ds_Signature
    )

    if (!isValid) {
      throw createError({
        statusCode: 400,
        message: 'Invalid signature'
      })
    }

    // Decodificar parámetros
    const params = redsys.decodeParams(body.Ds_MerchantParameters)

    // Ds_Response: código de respuesta
    // 0000-0099 = Transacción autorizada
    const responseCode = parseInt(params.Ds_Response)
    const isAuthorized = responseCode >= 0 && responseCode < 100

    // Actualizar orden en base de datos
    await updateOrderStatus(params.Ds_Order, {
      paymentStatus: isAuthorized ? 'paid' : 'failed',
      paymentResponse: params.Ds_Response,
      paymentAuthCode: params.Ds_AuthorisationCode,
      paymentDate: params.Ds_Date,
      paymentTime: params.Ds_Hour
    })

    // Enviar email de confirmación si está autorizado
    if (isAuthorized) {
      await sendOrderConfirmationEmail(params.Ds_Order)
    }

    return { received: true }
  } catch (error) {
    console.error('Redsys notification error:', error)
    throw createError({
      statusCode: 500,
      message: 'Error processing notification'
    })
  }
})
```

## Componente de Checkout

```vue
<script setup>
import { ref } from 'vue'

const props = defineProps({
  orderId: {
    type: String,
    required: true
  }
})

const processing = ref(false)
const paymentFormRef = ref(null)

const initiatePayment = async () => {
  processing.value = true

  try {
    // Obtener datos de pago de Redsys
    const { data } = await useFetch('/api/redsys/init-payment', {
      method: 'POST',
      body: {
        orderId: props.orderId
      }
    })

    if (data.value?.success) {
      // Crear formulario y enviarlo automáticamente
      const form = paymentFormRef.value

      // Agregar campos ocultos
      const fields = {
        Ds_SignatureVersion: data.value.paymentData.Ds_SignatureVersion,
        Ds_MerchantParameters: data.value.paymentData.Ds_MerchantParameters,
        Ds_Signature: data.value.paymentData.Ds_Signature
      }

      Object.entries(fields).forEach(([name, value]) => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = name
        input.value = value
        form.appendChild(input)
      })

      // Enviar formulario
      form.submit()
    }
  } catch (error) {
    console.error('Payment initialization error:', error)
    alert('Error al iniciar el pago')
  } finally {
    processing.value = false
  }
}
</script>

<template>
  <div>
    <!-- Formulario oculto que se enviará a Redsys -->
    <form
      ref="paymentFormRef"
      :action="paymentUrl"
      method="POST"
      style="display: none"
    ></form>

    <Button
      variant="primary"
      size="lg"
      :disabled="processing"
      @click="initiatePayment"
    >
      <span v-if="!processing">Pagar con Tarjeta</span>
      <span v-else>Procesando...</span>
    </Button>
  </div>
</template>
```

## Códigos de Respuesta

### Exitosos (0000-0099)
- `0000`: Transacción autorizada
- `0900`: Transacción autorizada para devoluciones

### Rechazados
- `0101`: Tarjeta caducada
- `0102`: Tarjeta en excepción transitoria o bajo sospecha de fraude
- `0106`: Intentos de PIN excedidos
- `0180`: Tarjeta ajena al servicio
- `0184`: Error en la autenticación del titular
- `0190`: Denegación del emisor sin especificar motivo

### Errores del sistema
- `0904`: Comercio no registrado en FUC
- `9915`: Pago cancelado por el usuario

## Testing

### Tarjetas de Prueba

En el entorno de test, usar estas tarjetas:

**Visa**
- Número: `4548812049400004`
- Caducidad: Cualquier fecha futura
- CVV: `123`

**Mastercard**
- Número: `5540500001000004`
- Caducidad: Cualquier fecha futura
- CVV: `123`

### Simular Respuestas

Para simular diferentes respuestas en test:
- Código de transacción exitosa: `0000`
- Código de rechazo: `0180`

## Seguridad

### Mejores Prácticas

1. **NUNCA exponer la Secret Key** en el cliente
2. Todas las operaciones de firma deben ser **server-side**
3. Verificar **siempre** la firma en las notificaciones
4. Validar que el **amount** coincide con el de la orden
5. Usar **HTTPS** en producción
6. Implementar **rate limiting** en endpoints de pago

### Validación de Notificaciones

```javascript
// Validaciones adicionales recomendadas
const validateNotification = (params, order) => {
  // 1. Verificar que el amount coincide
  if (parseInt(params.Ds_Amount) !== Math.round(order.total * 100)) {
    throw new Error('Amount mismatch')
  }

  // 2. Verificar merchant code
  if (params.Ds_MerchantCode !== config.redsys.merchantCode) {
    throw new Error('Invalid merchant code')
  }

  // 3. Verificar que la orden no ha sido procesada antes
  if (order.paymentStatus === 'paid') {
    throw new Error('Order already processed')
  }

  return true
}
```

## Bizum (Opcional)

Para aceptar pagos con Bizum a través de Redsys:

```javascript
const params = {
  // ... parámetros normales
  DS_MERCHANT_PAYMETHODS: 'z' // z = solo Bizum
}
```

## Producción

### Checklist Pre-Producción

- [ ] Cambiar variables de entorno a producción
- [ ] Actualizar URLs de notificación y retorno
- [ ] Verificar Secret Key de producción
- [ ] Configurar certificados SSL
- [ ] Probar flujo completo con tarjetas reales
- [ ] Implementar logging de transacciones
- [ ] Configurar alertas de errores
- [ ] Revisar cumplimiento PCI-DSS

### Logging

```javascript
// Guardar logs de todas las transacciones
await logTransaction({
  orderId: params.Ds_Order,
  amount: params.Ds_Amount,
  responseCode: params.Ds_Response,
  authCode: params.Ds_AuthorisationCode,
  timestamp: new Date()
})
```

## Soporte y Recursos

- **Soporte Redsys**: 902 100 164
- **Email**: comercios@redsys.es
- **Portal**: https://pagosonline.redsys.es
- **Documentación**: https://pagosonline.redsys.es/desarrolladores.html
