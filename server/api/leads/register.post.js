import { createItem, readItems } from '@directus/sdk'

// Rate limiting en memoria: IP -> { count, resetAt }
const rateLimitMap = new Map()
const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hora

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const REQUIRED_FIELDS = ['nombre', 'clinica', 'email', 'codigo_postal', 'ciudad', 'consentimiento']

function checkRateLimit(ip) {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  // Limpiar entradas expiradas periodicamente
  if (rateLimitMap.size > 10000) {
    for (const [key, val] of rateLimitMap) {
      if (now > val.resetAt) rateLimitMap.delete(key)
    }
  }

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return true
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false
  }

  entry.count++
  return true
}

function getClientIp(event) {
  return (
    getHeader(event, 'x-forwarded-for')?.split(',')[0]?.trim() ||
    getHeader(event, 'x-real-ip') ||
    event.node.req.socket?.remoteAddress ||
    'unknown'
  )
}

export default defineEventHandler(async (event) => {
  // Rate limiting
  const ip = getClientIp(event)
  if (!checkRateLimit(ip)) {
    throw createError({
      statusCode: 429,
      message: 'Demasiadas solicitudes. Intenta de nuevo mas tarde.',
    })
  }

  // Leer body
  const body = await readBody(event)

  if (!body || typeof body !== 'object') {
    throw createError({
      statusCode: 400,
      message: 'El cuerpo de la solicitud es invalido.',
    })
  }

  // Validar campos requeridos
  for (const field of REQUIRED_FIELDS) {
    if (field === 'consentimiento') {
      if (body.consentimiento !== true) {
        throw createError({
          statusCode: 400,
          message: 'Debes aceptar el consentimiento para continuar.',
        })
      }
      continue
    }

    if (!body[field] || typeof body[field] !== 'string' || !body[field].trim()) {
      throw createError({
        statusCode: 400,
        message: `El campo "${field}" es obligatorio.`,
      })
    }
  }

  // Validar formato email
  const email = body.email.trim().toLowerCase()
  if (!EMAIL_REGEX.test(email)) {
    throw createError({
      statusCode: 400,
      message: 'El formato del email no es valido.',
    })
  }

  // Validar intereses si se proporcionan
  if (body.intereses && !Array.isArray(body.intereses)) {
    throw createError({
      statusCode: 400,
      message: 'El campo "intereses" debe ser un array.',
    })
  }

  // Obtener cliente Directus
  const client = useDirectusServer()
  if (!client) {
    throw createError({
      statusCode: 500,
      message: 'Error interno del servidor. Intenta de nuevo mas tarde.',
    })
  }

  try {
    // Verificar duplicados por email (exito silencioso si ya existe)
    const existing = await client.request(
      readItems('leads', {
        filter: {
          email: { _eq: email },
        },
        limit: 1,
      }),
    )

    if (existing && existing.length > 0) {
      return { success: true, message: 'Registro completado' }
    }

    // Preparar datos para guardar
    const leadData = {
      nombre: body.nombre.trim(),
      clinica: body.clinica.trim(),
      email,
      telefono: body.telefono?.trim() || null,
      cargo: body.cargo?.trim() || null,
      codigo_postal: body.codigo_postal.trim(),
      ciudad: body.ciudad.trim(),
      provincia: body.provincia?.trim() || null,
      calle: body.calle?.trim() || null,
      intereses: body.intereses || [],
      intencion_comercial: body.intencion_comercial?.trim() || null,
      consentimiento: true,
      source: 'prelaunch-landing',
      status: 'new',
    }

    // Guardar en Directus
    await client.request(createItem('leads', leadData))

    return { success: true, message: 'Registro completado' }
  } catch (error) {
    console.error('Error registrando lead:', error)

    throw createError({
      statusCode: 500,
      message: 'Error al procesar el registro. Intenta de nuevo mas tarde.',
    })
  }
})
