/**
 * Health Check Endpoint
 *
 * Provides system health status, uptime, and connection checks
 * Used by Docker healthcheck and monitoring systems
 */

export default defineEventHandler(async (event) => {
  const startTime = Date.now()
  const config = useRuntimeConfig()

  // Basic health status
  const healthStatus = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: process.version,
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      rss: Math.round(process.memoryUsage().rss / 1024 / 1024),
      unit: 'MB'
    }
  }

  // Check Directus connection if in production
  if (process.env.NODE_ENV === 'production') {
    try {
      const directusUrl = config.public.directusUrl || process.env.NUXT_PUBLIC_DIRECTUS_URL

      if (directusUrl) {
        const response = await $fetch(`${directusUrl}/server/health`, {
          method: 'GET',
          timeout: 5000
        }).catch(() => null)

        healthStatus.directus = response ? 'connected' : 'disconnected'
      }
    } catch (error) {
      healthStatus.directus = 'error'
      healthStatus.directusError = error.message
    }
  }

  // Add response time
  healthStatus.responseTime = `${Date.now() - startTime}ms`

  // Set appropriate status code
  const statusCode = healthStatus.status === 'healthy' ? 200 : 503

  return sendNoContent(event, statusCode)
    ? undefined
    : healthStatus
})
