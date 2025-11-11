import { useRedsys, RedsysHelper } from '../../utils/redsys'

/**
 * Create Redsys Payment
 * Generates payment parameters and signature for Redsys form submission
 */
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    // Validate required fields
    const { cart, customer } = body

    if (!cart || !customer) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields: cart and customer',
      })
    }

    // Validate customer fields
    if (!customer.fullName || !customer.email) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required customer fields',
      })
    }

    // Calculate total amount
    const subtotal = cart.subtotal || 0
    const shipping = cart.shipping || 0
    const tax = cart.tax || 0
    const total = subtotal + shipping + tax

    if (total <= 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid total amount',
      })
    }

    // Generate unique order ID
    const orderId = RedsysHelper.generateOrderId()

    // Format amount for Redsys (cents)
    const amountCents = RedsysHelper.formatAmount(total)

    // Get base URL from config or environment
    const config = useRuntimeConfig()
    const baseUrl = config.public.baseUrl || process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    // Prepare order data
    const orderData = {
      orderId,
      amount: amountCents,
      customerEmail: customer.email,
      productDescription: `Pedido Codentsa - ${cart.items?.length || 0} productos`,
      successUrl: `${baseUrl}/checkout-success`,
      errorUrl: `${baseUrl}/checkout-error`,
    }

    // Initialize Redsys helper
    const redsys = useRedsys()

    // Create merchant parameters
    const merchantParameters = redsys.createMerchantParameters(orderData)

    // Create signature
    const signature = redsys.createSignature(merchantParameters, orderId)

    // Get Redsys URL
    const redsysUrl = redsys.getRedsysUrl()

    // Log payment creation (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Payment created:', {
        orderId,
        amount: total,
        amountCents,
        environment: redsys.environment,
      })
    }

    // Return form data for frontend
    return {
      success: true,
      orderId,
      redsysUrl,
      merchantParameters,
      signature,
      signatureVersion: 'HMAC_SHA256_V1',
      totalAmount: total,
      amountCents,
    }
  } catch (error) {
    console.error('❌ Error creating payment:', error)

    // Return structured error
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Error creating payment',
    })
  }
})
