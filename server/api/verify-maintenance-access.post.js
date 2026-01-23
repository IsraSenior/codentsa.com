export default defineEventHandler(async (event) => {
  const { maintenanceAccessKey } = useRuntimeConfig()
  const { key } = await readBody(event)

  if (!maintenanceAccessKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Maintenance access key not configured',
    })
  }

  if (key === maintenanceAccessKey) {
    return { success: true }
  }

  throw createError({
    statusCode: 401,
    statusMessage: 'Clave incorrecta',
  })
})
