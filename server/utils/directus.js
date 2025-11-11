import { createDirectus, rest, readItems, readItem, createItem, updateItem } from '@directus/sdk'

/**
 * Server-side Directus client
 * This client uses static token authentication for server-only operations
 * DO NOT expose this client or its methods to the frontend
 */

let directusServerClient = null

/**
 * Initialize server-side Directus client with authentication
 * @returns {Object|null} Directus client instance or null if not configured
 */
function initDirectusServer() {
  if (directusServerClient) {
    return directusServerClient
  }

  const config = useRuntimeConfig()
  const directusUrl = config.public.directusUrl // Public URL
  const directusToken = config.directusToken // Private token (server-only)

  if (!directusUrl) {
    console.warn('⚠️ Directus URL not configured (NUXT_PUBLIC_DIRECTUS_URL). Server operations will fail.')
    return null
  }

  if (!directusToken) {
    console.warn('⚠️ Directus token not configured (NUXT_DIRECTUS_TOKEN). Server operations will fail.')
    return null
  }

  try {
    directusServerClient = createDirectus(directusUrl)
      .with(rest())
      .with(
        // Static token authentication
        () => ({
          beforeRequest: (options) => {
            options.headers = options.headers || {}
            options.headers.Authorization = `Bearer ${directusToken}`
            return options
          },
        })
      )

    console.log('✅ Directus server client initialized with authentication')
    return directusServerClient
  } catch (error) {
    console.error('❌ Error initializing Directus server client:', error)
    return null
  }
}

/**
 * Get Directus server client instance
 * @returns {Object|null} Directus client or null
 */
export function useDirectusServer() {
  return initDirectusServer()
}

/**
 * Create a new order in Directus after successful payment
 * @param {Object} orderData - Order data from payment
 * @returns {Promise<Object|null>} Created order or null
 */
export async function createOrder(orderData) {
  const client = useDirectusServer()
  if (!client) {
    console.error('Cannot create order: Directus not configured')
    return null
  }

  try {
    const order = await client.request(
      createItem('orders', {
        order_id: orderData.orderId,
        status: orderData.status,
        customer_email: orderData.customerEmail,
        customer_name: orderData.customerName,
        customer_phone: orderData.customerPhone,
        shipping_address: orderData.shippingAddress,
        billing_address: orderData.billingAddress,
        items: orderData.items, // JSON field with cart items
        subtotal: orderData.subtotal,
        shipping: orderData.shipping,
        tax: orderData.tax,
        total: orderData.total,
        payment_method: orderData.paymentMethod || 'redsys',
        payment_data: orderData.paymentData, // JSON with Redsys response
        created_at: new Date().toISOString(),
      })
    )

    console.log(`✅ Order created in Directus: ${orderData.orderId}`)
    return order
  } catch (error) {
    console.error('Error creating order in Directus:', error)
    return null
  }
}

/**
 * Update order status
 * @param {string} orderId - Order ID
 * @param {string} status - New status
 * @param {Object} additionalData - Additional data to update
 * @returns {Promise<Object|null>} Updated order or null
 */
export async function updateOrderStatus(orderId, status, additionalData = {}) {
  const client = useDirectusServer()
  if (!client) {
    console.error('Cannot update order: Directus not configured')
    return null
  }

  try {
    // Find order by order_id field (not the primary key)
    const orders = await client.request(
      readItems('orders', {
        filter: {
          order_id: {
            _eq: orderId,
          },
        },
        limit: 1,
      })
    )

    if (!orders || orders.length === 0) {
      console.error(`Order not found: ${orderId}`)
      return null
    }

    const order = orders[0]

    // Update order
    const updated = await client.request(
      updateItem('orders', order.id, {
        status,
        ...additionalData,
        updated_at: new Date().toISOString(),
      })
    )

    console.log(`✅ Order updated in Directus: ${orderId} -> ${status}`)
    return updated
  } catch (error) {
    console.error(`Error updating order ${orderId}:`, error)
    return null
  }
}

/**
 * Get order by order ID
 * @param {string} orderId - Order ID from Redsys
 * @returns {Promise<Object|null>} Order data or null
 */
export async function getOrderById(orderId) {
  const client = useDirectusServer()
  if (!client) {
    console.error('Cannot get order: Directus not configured')
    return null
  }

  try {
    const orders = await client.request(
      readItems('orders', {
        filter: {
          order_id: {
            _eq: orderId,
          },
        },
        limit: 1,
      })
    )

    return orders && orders.length > 0 ? orders[0] : null
  } catch (error) {
    console.error(`Error fetching order ${orderId}:`, error)
    return null
  }
}

/**
 * Update product stock after order
 * @param {Array} items - Array of cart items with product IDs
 * @returns {Promise<boolean>} Success status
 */
export async function updateProductStock(items) {
  const client = useDirectusServer()
  if (!client) {
    console.error('Cannot update stock: Directus not configured')
    return false
  }

  try {
    for (const item of items) {
      // Get current product
      const product = await client.request(readItem('products', item.productId))

      if (product && product.stock !== undefined) {
        const newStock = Math.max(0, product.stock - item.quantity)

        await client.request(
          updateItem('products', item.productId, {
            stock: newStock,
          })
        )

        console.log(`✅ Stock updated for product ${item.productId}: ${product.stock} -> ${newStock}`)
      }
    }

    return true
  } catch (error) {
    console.error('Error updating product stock:', error)
    return false
  }
}

/**
 * Log payment event for auditing
 * @param {Object} eventData - Payment event data
 * @returns {Promise<Object|null>} Created log entry or null
 */
export async function logPaymentEvent(eventData) {
  const client = useDirectusServer()
  if (!client) {
    return null
  }

  try {
    const log = await client.request(
      createItem('payment_logs', {
        order_id: eventData.orderId,
        event_type: eventData.eventType,
        status: eventData.status,
        response_code: eventData.responseCode,
        raw_data: eventData.rawData, // JSON with full Redsys response
        ip_address: eventData.ipAddress,
        created_at: new Date().toISOString(),
      })
    )

    return log
  } catch (error) {
    console.error('Error logging payment event:', error)
    return null
  }
}
