import { createDirectus, rest, readItems, readItem } from '@directus/sdk'

/**
 * Directus Composable
 * Provides client-side methods to interact with Directus CMS
 *
 * Usage:
 * const { getProducts, getProductById } = useDirectus()
 * const products = await getProducts()
 */

let directusClient = null

/**
 * Initialize Directus client
 * @returns {Object} Directus client instance
 */
function initDirectus() {
  if (directusClient) {
    return directusClient
  }

  const config = useRuntimeConfig()
  const directusUrl = config.public.directusUrl

  if (!directusUrl) {
    console.warn('⚠️ Directus URL not configured. Using mock data.')
    return null
  }

  try {
    directusClient = createDirectus(directusUrl).with(rest())
    console.log('✅ Directus client initialized')
    return directusClient
  } catch (error) {
    console.error('❌ Error initializing Directus:', error)
    return null
  }
}

export function useDirectus() {
  const client = initDirectus()

  /**
   * Get all products
   * @param {Object} options - Query options (filter, sort, limit, etc.)
   * @returns {Promise<Array>} Array of products
   */
  async function getProducts(options = {}) {
    if (!client) {
      console.warn('Directus not configured, returning empty array')
      return []
    }

    try {
      const {
        filter = {},
        sort = ['-created_at'],
        limit = -1,
        fields = ['*'],
      } = options

      const products = await client.request(
        readItems('products', {
          filter,
          sort,
          limit,
          fields,
        })
      )

      return products
    } catch (error) {
      console.error('Error fetching products from Directus:', error)
      return []
    }
  }

  /**
   * Get product by ID
   * @param {string|number} id - Product ID
   * @returns {Promise<Object|null>} Product data or null
   */
  async function getProductById(id) {
    if (!client) {
      console.warn('Directus not configured, returning null')
      return null
    }

    try {
      const product = await client.request(
        readItem('products', id, {
          fields: ['*'],
        })
      )

      return product
    } catch (error) {
      console.error(`Error fetching product ${id} from Directus:`, error)
      return null
    }
  }

  /**
   * Get all categories
   * @returns {Promise<Array>} Array of categories
   */
  async function getCategories() {
    if (!client) {
      console.warn('Directus not configured, returning empty array')
      return []
    }

    try {
      const categories = await client.request(
        readItems('categories', {
          sort: ['name'],
          fields: ['*'],
        })
      )

      return categories
    } catch (error) {
      console.error('Error fetching categories from Directus:', error)
      return []
    }
  }

  /**
   * Get all brands
   * @returns {Promise<Array>} Array of brands
   */
  async function getBrands() {
    if (!client) {
      console.warn('Directus not configured, returning empty array')
      return []
    }

    try {
      const brands = await client.request(
        readItems('brands', {
          sort: ['name'],
          fields: ['*'],
        })
      )

      return brands
    } catch (error) {
      console.error('Error fetching brands from Directus:', error)
      return []
    }
  }

  /**
   * Get product reviews
   * @param {string|number} productId - Product ID
   * @returns {Promise<Array>} Array of reviews
   */
  async function getProductReviews(productId) {
    if (!client) {
      console.warn('Directus not configured, returning empty array')
      return []
    }

    try {
      const reviews = await client.request(
        readItems('reviews', {
          filter: {
            product_id: {
              _eq: productId,
            },
            status: {
              _eq: 'published',
            },
          },
          sort: ['-created_at'],
          fields: ['*'],
        })
      )

      return reviews
    } catch (error) {
      console.error(`Error fetching reviews for product ${productId}:`, error)
      return []
    }
  }

  /**
   * Search products
   * @param {string} query - Search query
   * @returns {Promise<Array>} Array of matching products
   */
  async function searchProducts(query) {
    if (!client) {
      console.warn('Directus not configured, returning empty array')
      return []
    }

    try {
      const products = await client.request(
        readItems('products', {
          filter: {
            _or: [
              {
                name: {
                  _contains: query,
                },
              },
              {
                description: {
                  _contains: query,
                },
              },
            ],
          },
          fields: ['*'],
        })
      )

      return products
    } catch (error) {
      console.error('Error searching products:', error)
      return []
    }
  }

  return {
    client,
    getProducts,
    getProductById,
    getCategories,
    getBrands,
    getProductReviews,
    searchProducts,
  }
}
