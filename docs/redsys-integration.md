# Redsys Integration - Codentsa E-commerce

Documentación completa de la integración de la pasarela de pagos Redsys en Codentsa.

## Índice

- [Descripción General](#descripción-general)
- [Arquitectura](#arquitectura)
- [Flujo de Pago Completo](#flujo-de-pago-completo)
- [Configuración](#configuración)
- [Endpoints del Servidor](#endpoints-del-servidor)
- [Testing en Sandbox](#testing-en-sandbox)
- [Tarjetas de Prueba](#tarjetas-de-prueba)
- [Códigos de Respuesta](#códigos-de-respuesta)
- [Producción](#producción)
- [Troubleshooting](#troubleshooting)

---

## Descripción General

Redsys es la plataforma de pagos más utilizada en España, integrada por la mayoría de bancos españoles. Permite procesar pagos con tarjetas de crédito/débito de manera segura mediante cifrado 3DES y firmas HMAC-SHA256.

### Características Implementadas

✅ Pago con tarjeta de crédito/débito
✅ Autenticación 3D Secure (SCA)
✅ Firmas criptográficas HMAC-SHA256
✅ Webhooks para notificaciones de pago
✅ Verificación de pagos
✅ Manejo de errores completo
✅ Ambiente de sandbox para testing

### Características NO Implementadas (Futuras)

- Bizum
- Pago con Google Pay / Apple Pay
- Pagos recurrentes / Suscripciones
- Devoluciones automáticas desde el panel

---

## Arquitectura

### Componentes

```
┌─────────────────┐
│  Cliente (Vue)  │
│  checkout.vue   │
└────────┬────────┘
         │ 1. Envía datos del carrito
         ↓
┌─────────────────────────────────────┐
│  Server Endpoint                    │
│  /api/redsys/create-payment.post.js │
│  - Genera order ID                  │
│  - Crea parámetros                  │
│  - Firma con HMAC-SHA256            │
└────────┬────────────────────────────┘
         │ 2. Retorna datos firmados
         ↓
┌─────────────────┐
│  Cliente (Vue)  │
│  - Crea form    │
│  - POST a Redsys│
└────────┬────────┘
         │ 3. Redirige
         ↓
┌─────────────────┐
│  Redsys TPV     │ ← Usuario introduce tarjeta
│  (Externo)      │
└────────┬────────┘
         │ 4a. Webhook (notificación)
         ↓
┌──────────────────────────────────┐
│  /api/redsys/notification.post   │
│  - Verifica firma                │
│  - Guarda orden en Directus      │
│  - Actualiza stock               │
│  - Envía email (futuro)          │
└──────────────────────────────────┘

         │ 4b. Redirección al usuario
         ↓
┌─────────────────────────────┐
│  /checkout-success          │
│  - Verifica pago            │
│  - Muestra detalles         │
│  - Limpia carrito           │
└─────────────────────────────┘
```

---

## Flujo de Pago Completo

### 1. Usuario Completa el Checkout

El usuario rellena sus datos personales y de envío en [/checkout](../app/pages/checkout.vue):

```javascript
const personalInfo = ref({
  name: '',
  email: '',
  phone: '',
  nif: '',
})

const shippingInfo = ref({
  address: '',
  city: '',
  province: '',
  postalCode: '',
  country: 'España',
})
```

### 2. Llamada al Endpoint de Creación

Al hacer clic en "Proceder al pago", se envía una petición al servidor:

```javascript
const response = await $fetch('/api/redsys/create-payment', {
  method: 'POST',
  body: {
    cart: {
      items: cartItems.value,
      subtotal: subtotal.value,
      shipping: shipping.value,
      tax: tax.value,
    },
    customer: personalInfo.value,
  },
})
```

### 3. Servidor Genera Parámetros

El endpoint [server/api/redsys/create-payment.post.js](../server/api/redsys/create-payment.post.js) procesa los datos:

```javascript
// 1. Generar Order ID único
const orderId = RedsysHelper.generateOrderId() // Ej: "202501111234"

// 2. Convertir total a céntimos
const total = cart.subtotal + cart.shipping + cart.tax
const amountCents = RedsysHelper.formatAmount(total) // 599.99 → "59999"

// 3. Crear parámetros
const merchantParameters = redsys.createMerchantParameters({
  orderId,
  amount: amountCents,
  customerEmail: customer.email,
  productDescription: 'Pedido Codentsa - 3 productos',
  successUrl: 'https://codentsa.com/checkout-success',
  errorUrl: 'https://codentsa.com/checkout-error',
})

// 4. Firmar con HMAC-SHA256
const signature = redsys.createSignature(merchantParameters, orderId)

// 5. Retornar al cliente
return {
  orderId,
  redsysUrl: 'https://sis-t.redsys.es:25443/sis/realizarPago',
  merchantParameters, // Base64
  signature, // Base64
  signatureVersion: 'HMAC_SHA256_V1',
}
```

### 4. Cliente Envía Form a Redsys

El cliente crea un formulario oculto y lo envía:

```javascript
const form = document.createElement('form')
form.method = 'POST'
form.action = response.redsysUrl

const fields = {
  Ds_SignatureVersion: 'HMAC_SHA256_V1',
  Ds_MerchantParameters: response.merchantParameters,
  Ds_Signature: response.signature,
}

Object.entries(fields).forEach(([key, value]) => {
  const input = document.createElement('input')
  input.type = 'hidden'
  input.name = key
  input.value = value
  form.appendChild(input)
})

document.body.appendChild(form)
form.submit() // Redirige a Redsys
```

### 5. Usuario Introduce Tarjeta en Redsys

El usuario es redirigido a la página segura de Redsys donde:
1. Introduce los datos de su tarjeta
2. Completa autenticación 3D Secure si es necesario
3. Confirma el pago

### 6. Redsys Envía Webhook

**IMPORTANTE**: Este webhook es independiente de la redirección al usuario.

El endpoint [server/api/redsys/notification.post.js](../server/api/redsys/notification.post.js) procesa la notificación:

```javascript
// 1. Recibir datos de Redsys
const { Ds_MerchantParameters, Ds_Signature } = await readBody(event)

// 2. Verificar firma
const isValid = redsys.verifySignature(Ds_MerchantParameters, Ds_Signature)
if (!isValid) {
  throw createError({ statusCode: 401 })
}

// 3. Decodificar respuesta
const response = redsys.decodeResponse(Ds_MerchantParameters)

// 4. Verificar si el pago fue exitoso
const paymentResult = RedsysHelper.parseResponseCode(response.Ds_Response)

if (paymentResult.status === 'success') {
  // 5. Guardar orden en Directus
  await createOrder({ orderId, status: 'paid', ... })

  // 6. Actualizar stock
  await updateProductStock(cartItems)

  // 7. Log para auditoría
  await logPaymentEvent({ orderId, eventType: 'payment_success', ... })
}
```

### 7. Redirección al Usuario

Redsys redirige al usuario a:
- **Éxito**: `/checkout-success?Ds_SignatureVersion=...&Ds_MerchantParameters=...&Ds_Signature=...`
- **Error**: `/checkout-error?errorType=declined`

### 8. Página de Confirmación

La página [/checkout-success](../app/pages/checkout-success.vue) verifica el pago:

```javascript
onMounted(async () => {
  const { Ds_MerchantParameters, Ds_Signature } = route.query

  const response = await $fetch('/api/redsys/verify-payment', {
    method: 'POST',
    body: { Ds_MerchantParameters, Ds_Signature },
  })

  if (response.verified && response.payment.status === 'success') {
    paymentData.value = response.payment
    cartStore.clearCart()
  } else {
    router.push('/checkout-error?errorType=verification')
  }
})
```

---

## Configuración

### Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
# Redsys Sandbox (Testing)
REDSYS_MERCHANT_CODE=999008881
REDSYS_TERMINAL=001
REDSYS_SECRET_KEY=sq7HjrUOBfKmC576ILgskD5srU870gJ7
REDSYS_ENVIRONMENT=sandbox
REDSYS_CURRENCY=978

# Producción (cuando tengas tus credenciales)
# REDSYS_MERCHANT_CODE=tu_codigo_FUC
# REDSYS_TERMINAL=001
# REDSYS_SECRET_KEY=tu_clave_secreta
# REDSYS_ENVIRONMENT=production
# REDSYS_CURRENCY=978
```

### Obtener Credenciales de Producción

1. **Contactar con tu banco** que soporte Redsys
2. **Solicitar alta en TPV Virtual** (Terminal Punto de Venta)
3. Recibirás:
   - **FUC (Código de Comercio)**: Ej. `123456789`
   - **Terminal**: Usualmente `001`
   - **Clave Secreta**: Para firmar transacciones
4. **Configurar URLs de callback** en el panel de Redsys:
   - URL de notificación: `https://codentsa.com/api/redsys/notification`

---

## Endpoints del Servidor

### 1. POST `/api/redsys/create-payment`

Genera los parámetros necesarios para iniciar el pago.

**Ubicación**: [server/api/redsys/create-payment.post.js](../server/api/redsys/create-payment.post.js)

**Request:**
```json
{
  "cart": {
    "items": [...],
    "subtotal": 599.99,
    "shipping": 5.00,
    "tax": 126.00
  },
  "customer": {
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "phone": "+34 612345678"
  }
}
```

**Response:**
```json
{
  "success": true,
  "orderId": "202501111234",
  "redsysUrl": "https://sis-t.redsys.es:25443/sis/realizarPago",
  "merchantParameters": "eyJEc19NZXJjaGFudF9NZXJjaGFudENvZGUi...",
  "signature": "frNecC+3WjQKpNUl0X3nT0/hW+3L1nO7u+4sD9W6g7w=",
  "signatureVersion": "HMAC_SHA256_V1"
}
```

### 2. POST `/api/redsys/notification`

Webhook que recibe notificaciones de Redsys (procesamiento server-to-server).

**Ubicación**: [server/api/redsys/notification.post.js](../server/api/redsys/notification.post.js)

**Request (desde Redsys):**
```
Ds_SignatureVersion=HMAC_SHA256_V1
Ds_MerchantParameters=eyJEc19NZXJjaGFudF9NZXJjaGFudENvZGUi...
Ds_Signature=frNecC+3WjQKpNUl0X3nT0/hW+3L1nO7u+4sD9W6g7w=
```

**Response:**
```json
{
  "success": true,
  "orderId": "202501111234",
  "status": "success"
}
```

**IMPORTANTE**: Este endpoint DEBE responder con status 200 para que Redsys marque la notificación como recibida.

### 3. POST `/api/redsys/verify-payment`

Verifica un pago desde el frontend después de la redirección.

**Ubicación**: [server/api/redsys/verify-payment.post.js](../server/api/redsys/verify-payment.post.js)

**Request:**
```json
{
  "Ds_SignatureVersion": "HMAC_SHA256_V1",
  "Ds_MerchantParameters": "eyJEc19NZXJjaGFudF9NZXJjaGFudENvZGUi...",
  "Ds_Signature": "frNecC+3WjQKpNUl0X3nT0/hW+3L1nO7u+4sD9W6g7w="
}
```

**Response:**
```json
{
  "success": true,
  "verified": true,
  "payment": {
    "orderId": "202501111234",
    "status": "success",
    "message": "Transacción autorizada",
    "responseCode": "0000",
    "authorisationCode": "123456",
    "amount": 730.99,
    "maskedCard": "****1234"
  }
}
```

---

## Testing en Sandbox

### URLs de Sandbox

- **URL de pago**: `https://sis-t.redsys.es:25443/sis/realizarPago`
- **Panel de administración**: No disponible en sandbox

### Credenciales de Sandbox

```env
REDSYS_MERCHANT_CODE=999008881
REDSYS_TERMINAL=001
REDSYS_SECRET_KEY=sq7HjrUOBfKmC576ILgskD5srU870gJ7
REDSYS_ENVIRONMENT=sandbox
```

**IMPORTANTE**: Estas credenciales son públicas y solo funcionan en el entorno de pruebas.

### Proceso de Testing

1. **Iniciar servidor de desarrollo**:
   ```bash
   pnpm dev
   ```

2. **Navegar al checkout**:
   - Agregar productos al carrito
   - Ir a `/carrito`
   - Clic en "Proceder al pago"

3. **Completar formulario**:
   - Rellenar todos los campos requeridos
   - Usar email válido

4. **Usar tarjeta de prueba**:
   - Número: `4548812049400004`
   - Fecha: Cualquier fecha futura (Ej: `12/30`)
   - CVV: Cualquier 3 dígitos (Ej: `123`)
   - Nombre: Cualquier nombre

5. **Completar autenticación 3DS**:
   - Clave: `123456` (en sandbox siempre es esta)

6. **Verificar resultado**:
   - Deberías ser redirigido a `/checkout-success`
   - Verificar que se muestra el número de pedido
   - Verificar que el carrito se ha vaciado

---

## Tarjetas de Prueba

### Tarjetas que Aprueban

| Número de Tarjeta | Tipo | CVV | Fecha | 3DS |
|-------------------|------|-----|-------|-----|
| `4548812049400004` | Visa | Cualquiera | Futura | `123456` |
| `5555555555554444` | Mastercard | Cualquiera | Futura | `123456` |

### Tarjetas que Rechazan

Para testear flujos de error:

| Número de Tarjeta | Tipo | Resultado |
|-------------------|------|-----------|
| `4548810000000003` | Visa | Denegada (fondos insuficientes) |
| `4548810000000011` | Visa | Denegada (tarjeta caducada) |
| `4548810000000029` | Visa | Denegada (tarjeta bloqueada) |

### Importes de Prueba

Ciertos importes generan respuestas específicas:

| Importe (€) | Céntimos | Resultado |
|-------------|----------|-----------|
| 0.01 | 1 | Aprobada |
| 0.02 | 2 | Denegada (fondos insuficientes) |
| 0.03 | 3 | Denegada (tarjeta no válida) |
| 0.04 | 4 | Denegada (tarjeta robada) |
| 0.05 | 5 | Error técnico |

---

## Códigos de Respuesta

### Códigos de Éxito

| Código | Descripción |
|--------|-------------|
| `0000` - `0099` | Transacción autorizada |

### Códigos de Error Comunes

| Código | Descripción | Acción |
|--------|-------------|--------|
| `0101` | Tarjeta caducada | Solicitar otra tarjeta |
| `0102` | Tarjeta bloqueada temporalmente | Contactar con banco |
| `0104` | Operación no permitida | Verificar tipo de tarjeta |
| `0106` | Intentos de PIN excedidos | Tarjeta bloqueada |
| `0116` | Fondos insuficientes | Solicitar otro método de pago |
| `0118` | Tarjeta no registrada | Verificar datos |
| `0125` | Tarjeta no efectiva | Tarjeta aún no activada |
| `0129` | CVV incorrecto | Verificar código de seguridad |
| `0180` | Tarjeta no válida | Verificar número de tarjeta |
| `0184` | Error de autenticación | Verificar identidad del titular |
| `0190` | Denegada sin especificar | Contactar con banco |
| `9064` | Número de posiciones incorrecto | Verificar número |
| `9078` | Tipo de operación no permitida | No soportada |
| `9093` | Tarjeta no existe | Número incorrecto |
| `9094` | Rechazo servidores internacionales | Intentar más tarde |

Todos los códigos están mapeados en [server/utils/redsys.js:parseResponseCode()](../server/utils/redsys.js)

---

## Producción

### Checklist Pre-Lanzamiento

- [ ] **Credenciales de producción configuradas** en `.env`
- [ ] **REDSYS_ENVIRONMENT** cambiado a `production`
- [ ] **URLs de callback** configuradas en panel de Redsys
- [ ] **Certificado SSL** instalado (HTTPS obligatorio)
- [ ] **Webhook accesible** desde internet (no localhost)
- [ ] **Testing completo** en sandbox
- [ ] **Manejo de errores** verificado
- [ ] **Emails transaccionales** configurados (futuro)
- [ ] **Monitoring** de pagos activo

### URLs de Producción

```javascript
// En producción, las URLs cambian:
const redsysUrl = 'https://sis.redsys.es/sis/realizarPago' // Sin '-t'
```

### Configurar Webhook en Redsys

1. Acceder al panel de administración de tu banco/Redsys
2. Configurar URL de notificación:
   ```
   https://codentsa.com/api/redsys/notification
   ```
3. Verificar que el endpoint sea accesible públicamente
4. Testear con `curl`:
   ```bash
   curl -X POST https://codentsa.com/api/redsys/notification \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "Ds_SignatureVersion=HMAC_SHA256_V1&Ds_MerchantParameters=test&Ds_Signature=test"
   ```

---

## Troubleshooting

### Error: "SIS0042: Error de firma"

**Causa**: La firma HMAC-SHA256 no coincide.

**Soluciones**:
1. Verificar que la clave secreta sea correcta
2. Verificar formato del Order ID (máximo 12 caracteres)
3. Verificar que se use el Order ID correcto para cifrar
4. Revisar logs del servidor

### Error: "SIS0051: Número de pedido repetido"

**Causa**: El Order ID ya fue usado anteriormente.

**Soluciones**:
1. Verificar función `generateOrderId()` - debe ser única
2. Implementar check en base de datos antes de crear orden
3. No reenviar el mismo formulario múltiples veces

### Error: "SIS0007: Error al recibir el pago"

**Causa**: Parámetros mal formados o incompletos.

**Soluciones**:
1. Verificar todos los parámetros obligatorios
2. Verificar encoding Base64
3. Revisar formato de los importes (céntimos)

### Webhook No Recibe Notificaciones

**Causa**: El endpoint no es accesible públicamente.

**Soluciones**:
1. Verificar que la URL sea HTTPS
2. Verificar que no requiera autenticación
3. Testear con herramientas externas (Postman, curl)
4. Revisar firewall y configuración del servidor
5. En desarrollo local, usar tunneling:
   ```bash
   ngrok http 3000
   # Usar URL generada: https://abc123.ngrok.io/api/redsys/notification
   ```

### Pago Aprobado pero Orden No Se Crea

**Causa**: Error en el webhook o en la creación de la orden.

**Soluciones**:
1. Revisar logs de `payment_logs` en Directus
2. Verificar conexión a Directus
3. Verificar permisos del token de Directus
4. Revisar consola del servidor para errores

---

## Recursos Adicionales

### Documentación Oficial

- [Redsys - Documentación Técnica](https://pagosonline.redsys.es/desarrolladores.html)
- [Redsys - Manual de Integración](https://pagosonline.redsys.es/conexion-redireccion.html)
- [Códigos de Respuesta](https://pagosonline.redsys.es/codigos-de-respuesta.html)

### Testing Tools

- [Redsys Sandbox](https://sis-t.redsys.es:25443/sis/realizarPago)
- [ngrok](https://ngrok.com/) - Tunneling para webhooks en local
- [Postman](https://www.postman.com/) - Testing de APIs

### Soporte

- **Soporte Técnico Redsys**: soportecomercio@redsys.es
- **Teléfono**: 902 313 314

---

## Seguridad

### Mejores Prácticas

1. **NUNCA exponer** la clave secreta (`REDSYS_SECRET_KEY`) al cliente
2. **SIEMPRE verificar** la firma en el webhook
3. **SIEMPRE validar** importes en el servidor
4. **NO confiar** en datos del cliente sin verificar

### Cumplimiento PCI-DSS

La integración actual cumple con PCI-DSS porque:
- ✅ No manejamos datos de tarjetas directamente
- ✅ Todos los datos sensibles pasan por Redsys
- ✅ Usamos HTTPS para todas las comunicaciones
- ✅ No almacenamos CVV ni datos completos de tarjetas

### GDPR

Para cumplir con GDPR:
- Obtener consentimiento explícito para procesar datos de pago
- Informar sobre el procesamiento de datos por terceros (Redsys)
- Permitir al usuario solicitar eliminación de datos
- No almacenar más datos de los necesarios

---

**Última actualización**: 2025-01-11
**Versión de crypto-js**: 4.2.0
**Entorno de Pruebas**: Redsys Sandbox
