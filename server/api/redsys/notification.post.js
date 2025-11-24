import { useRedsys, RedsysHelper } from '../../utils/redsys'

/**
 * Redsys Notification Webhook
 * Receives POST notifications from Redsys after payment
 * IMPORTANT: This endpoint is called by Redsys, not the frontend
 */
export default defineEventHandler(async (event) => {
  try {
    // Read form data from Redsys
    const body = await readBody(event)

    const {
      Ds_MerchantParameters,
      Ds_Signature,
    } = body

    if (!Ds_MerchantParameters || !Ds_Signature) {
      console.error('❌ Missing parameters in notification')
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
      console.error('❌ Invalid signature in notification')
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid signature',
      })
    }

    // Decode response parameters
    const response = redsys.decodeResponse(Ds_MerchantParameters)

    if (!response) {
      console.error('❌ Failed to decode parameters')
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid parameters',
      })
    }

    // Extract payment information
    const orderId = response.Ds_Order || response.DS_ORDER
    const responseCode = response.Ds_Response || response.DS_RESPONSE
    const authorisationCode = response.Ds_AuthorisationCode || response.DS_AUTHORISATIONCODE
    const amount = response.Ds_Amount || response.DS_AMOUNT
    const cardNumber = response.Ds_Card_Number || response.DS_CARD_NUMBER

    // Parse response code
    const paymentResult = RedsysHelper.parseResponseCode(responseCode)

    // Log notification (always log in production for audit trail)
    console.log(`📨 Redsys Notification:`, {
      orderId,
      status: paymentResult.status,
      responseCode,
      authorisationCode,
      amount: RedsysHelper.parseAmount(amount),
      maskedCard: cardNumber ? `****${cardNumber.slice(-4)}` : 'N/A',
    })

    // TODO: Save order to database (Directus integration pending)
    // TODO: Send confirmation email to customer
    // TODO: Update inventory
    // TODO: Trigger fulfillment process

    if (paymentResult.status === 'success') {
      // Payment successful
      console.log(`✅ Payment ${orderId} processed successfully`)

      // Here you would:
      // 1. Save order to Directus orders collection
      // 2. Update product stock
      // 3. Send confirmation email
      // 4. Clear customer cart (if using server-side cart)

      // For now, just log
      console.log(`💾 Order ${orderId} should be saved to database`)
      console.log(`📧 Confirmation email should be sent`)
    } else {
      // Payment failed
      console.log(`❌ Payment ${orderId} failed:`, paymentResult.message)

      // Here you would:
      // 1. Save failed payment attempt for audit
      // 2. Notify customer of failure
      // 3. Optionally send notification to admin
    }

    // Always return OK to Redsys
    // According to Redsys docs, we must return HTTP 200 with specific response
    return {
      success: true,
      orderId,
      status: paymentResult.status,
    }
  } catch (error) {
    // Log error but still return 200 to Redsys
    // We don't want Redsys to keep retrying
    console.error('❌ Error processing notification:', error)

    return {
      success: false,
      error: error.message,
    }
  }
})
