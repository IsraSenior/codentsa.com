import { useRedsys, RedsysHelper } from '../../utils/redsys'

/**
 * Verify Redsys Payment
 * Verifies the payment result returned from Redsys
 * Called by frontend after redirect from Redsys
 */
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const {
      Ds_MerchantParameters,
      Ds_Signature,
    } = body

    if (!Ds_MerchantParameters || !Ds_Signature) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required parameters',
      })
    }

    // Initialize Redsys helper
    const redsys = useRedsys()

    // Verify signature
    const isValid = redsys.verifySignature(Ds_MerchantParameters, Ds_Signature)

    if (!isValid) {
      console.error('❌ Invalid signature in payment verification')
      return {
        success: false,
        verified: false,
        error: 'Invalid signature',
      }
    }

    // Decode response parameters
    const response = redsys.decodeResponse(Ds_MerchantParameters)

    if (!response) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Failed to decode parameters',
      })
    }

    // Extract payment information
    const orderId = response.Ds_Order || response.DS_ORDER
    const responseCode = response.Ds_Response || response.DS_RESPONSE
    const authorisationCode = response.Ds_AuthorisationCode || response.DS_AUTHORISATIONCODE
    const amount = response.Ds_Amount || response.DS_AMOUNT
    const currency = response.Ds_Currency || response.DS_CURRENCY
    const cardNumber = response.Ds_Card_Number || response.DS_CARD_NUMBER
    const date = response.Ds_Date || response.DS_DATE
    const hour = response.Ds_Hour || response.DS_HOUR

    // Parse response code
    const paymentResult = RedsysHelper.parseResponseCode(responseCode)

    // Log verification
    console.log(`🔍 Payment verification:`, {
      orderId,
      status: paymentResult.status,
      responseCode,
    })

    // Return verification result
    return {
      success: true,
      verified: true,
      payment: {
        orderId,
        status: paymentResult.status,
        message: paymentResult.message,
        responseCode,
        authorisationCode,
        amount: RedsysHelper.parseAmount(amount),
        currency,
        maskedCard: cardNumber ? `****${cardNumber.slice(-4)}` : null,
        date,
        hour,
      },
    }
  } catch (error) {
    console.error('❌ Error verifying payment:', error)

    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Error verifying payment',
    })
  }
})
