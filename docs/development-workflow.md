# Development Workflow

## Git Workflow

### Estructura de Commits

Seguimos **Conventional Commits** para mensajes claros y consistentes:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `refactor`: Cambio de código que no añade funcionalidad ni corrige bugs
- `style`: Cambios de formato (espacios, comas, etc.)
- `docs`: Cambios en documentación
- `test`: Añadir o modificar tests
- `chore`: Tareas de mantenimiento

**Ejemplos:**
```bash
feat(products): add filter by category functionality

- Implement category filter dropdown
- Add query param handling
- Update ProductGrid component

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

```bash
fix(cart): resolve item duplication bug

Fixed issue where adding same product twice created duplicate entries
instead of incrementing quantity.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Branching Strategy

**Main Branches:**
- `main`: Código en producción
- `develop`: Código en desarrollo (staging)

**Feature Branches:**
```bash
# Crear feature branch
git checkout -b feature/product-filters

# Trabajar en la feature...
git add .
git commit -m "feat(products): add price range filter"

# Merge a develop (via PR)
git checkout develop
git merge feature/product-filters

# Eliminar branch local
git branch -d feature/product-filters
```

**Naming Conventions:**
- `feature/descripcion` - Nuevas funcionalidades
- `fix/descripcion` - Correcciones de bugs
- `refactor/descripcion` - Refactorización
- `docs/descripcion` - Documentación

### Pull Requests

**Checklist antes de crear PR:**
- [ ] Código formateado (`pnpm format`)
- [ ] Sin errores de linting (`pnpm lint`)
- [ ] Tests passing (si aplica)
- [ ] Documentación actualizada
- [ ] Commits atómicos y descriptivos

**Template de PR:**
```markdown
## Descripción
Breve descripción de los cambios realizados.

## Tipo de cambio
- [ ] Nueva funcionalidad
- [ ] Corrección de bug
- [ ] Refactorización
- [ ] Documentación

## Cambios incluidos
- Cambio 1
- Cambio 2
- Cambio 3

## Testing
Describir cómo se probaron los cambios.

## Screenshots (si aplica)
Capturas de pantalla de la UI.

## Checklist
- [ ] Mi código sigue los estándares del proyecto
- [ ] He formateado el código con Prettier
- [ ] He ejecutado el linter sin errores
- [ ] He actualizado la documentación
- [ ] No hay console.logs en el código
```

## Code Review

### Qué revisar

**1. Funcionalidad**
- ¿El código hace lo que debe hacer?
- ¿Hay casos edge no contemplados?

**2. Calidad de Código**
- ¿Es legible y mantenible?
- ¿Sigue los patrones establecidos?
- ¿Hay código duplicado?

**3. Performance**
- ¿Hay optimizaciones necesarias?
- ¿Se usa memoización donde corresponde?
- ¿Las queries son eficientes?

**4. Seguridad**
- ¿Hay inputs sin validar?
- ¿Se exponen datos sensibles?
- ¿Hay riesgos de XSS o injection?

**5. Testing**
- ¿Hay suficientes tests?
- ¿Los tests son significativos?

### Comentarios Constructivos

```markdown
✅ BUENO:
"Considera usar `computed` aquí en lugar de recalcular en cada render.
Ejemplo: `const total = computed(() => items.value.reduce(...))`"

❌ MALO:
"Esto está mal"
```

## Desarrollo Local

### Setup Diario

```bash
# 1. Actualizar código
git pull origin develop

# 2. Instalar dependencias (si cambió package.json)
pnpm install

# 3. Iniciar servidor de desarrollo
pnpm dev
```

### Hot Reload

Nuxt 4 incluye HMR (Hot Module Replacement):
- Cambios en componentes Vue se reflejan instantáneamente
- Cambios en server routes requieren restart manual
- Cambios en nuxt.config.ts requieren restart

### Debug

**Vue Devtools:**
```bash
# Instalar extensión de navegador
# Chrome: Vue.js devtools
# Firefox: Vue.js devtools
```

**Console Logs Estructurados:**
```javascript
// Desarrollo
if (process.dev) {
  console.log('Product data:', product)
}

// Nunca en producción
if (!process.dev) {
  console.log = () => { }
  console.warn = () => { }
}
```

**Nuxt DevTools:**
Incluido por defecto en Nuxt 4. Acceder desde el navegador.

## Testing (Futuro)

### Unit Tests (Vitest)

```bash
# Instalar
pnpm add -D vitest @vue/test-utils happy-dom

# Ejecutar
pnpm test
pnpm test:watch
pnpm test:coverage
```

**Ejemplo:**
```javascript
// components/Button.spec.js
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Button from './Button.vue'

describe('Button', () => {
  it('renders text correctly', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me'
      }
    })
    expect(wrapper.text()).toBe('Click me')
  })

  it('emits click event', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('is disabled when prop is true', () => {
    const wrapper = mount(Button, {
      props: { disabled: true }
    })
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })
})
```

### E2E Tests (Playwright)

```bash
# Instalar
pnpm add -D @playwright/test

# Ejecutar
pnpm test:e2e
```

**Ejemplo:**
```javascript
// tests/e2e/checkout.spec.js
import { test, expect } from '@playwright/test'

test('complete checkout flow', async ({ page }) => {
  // Ir a producto
  await page.goto('/products/instrumental-quirurgico')

  // Añadir al carrito
  await page.click('button:has-text("Añadir al Carrito")')

  // Ir al carrito
  await page.click('a[href="/cart"]')
  await expect(page.locator('h1')).toContainText('Carrito')

  // Proceder al checkout
  await page.click('button:has-text("Proceder al Pago")')
  await expect(page).toHaveURL('/checkout')

  // Llenar formulario
  await page.fill('input[name="email"]', 'test@example.com')
  await page.fill('input[name="phone"]', '600000000')
  // ... más campos

  // Confirmar orden
  await page.click('button[type="submit"]')
  await expect(page).toHaveURL(/\/checkout\/success/)
})
```

## Environment Management

### .env Files

```bash
.env                # Local development (no commitear)
.env.example        # Template (commitear)
.env.production     # Production (no commitear)
```

### Variables según Entorno

```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    // Server-only
    directus: {
      url: process.env.NUXT_DIRECTUS_URL,
      token: process.env.NUXT_DIRECTUS_TOKEN
    },

    // Public (exposed to client)
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000',
      googleAnalyticsId: process.env.NUXT_PUBLIC_GOOGLE_ANALYTICS_ID
    }
  }
})
```

## Code Quality

### Pre-commit Hook (Opcional)

```bash
# Instalar husky
pnpm add -D husky lint-staged

# Configurar
npx husky install

# Crear hook
npx husky add .husky/pre-commit "pnpm lint-staged"
```

**package.json:**
```json
{
  "lint-staged": {
    "*.{js,vue}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{css,md,json}": [
      "prettier --write"
    ]
  }
}
```

### Editor Config

El proyecto ya incluye `.editorconfig` para consistencia:
```ini
[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_style = space
indent_size = 2
```

## Performance Monitoring

### Lighthouse CI

```bash
# Instalar
pnpm add -D @lhci/cli

# Ejecutar
npx lhci autorun
```

**lighthouserc.js:**
```javascript
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000'],
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }]
      }
    }
  }
}
```

## Deployment

### Build de Producción

```bash
# 1. Build
pnpm build

# 2. Preview local
pnpm preview

# 3. Verificar funcionalidad
# - Navegar por el sitio
# - Probar checkout
# - Verificar analytics
```

### Checklist Pre-Deployment

- [ ] Variables de entorno actualizadas
- [ ] Build exitoso sin warnings
- [ ] Lighthouse score > 90
- [ ] No console.logs en código
- [ ] Sitemap actualizado
- [ ] Robots.txt correcto
- [ ] SSL configurado
- [ ] DNS configurado
- [ ] Analytics funcionando
- [ ] Backup de base de datos

### Continuous Deployment

**Vercel:**
1. Conectar repositorio
2. Configurar variables de entorno
3. Build automático en cada push a `main`

**Netlify:**
1. Conectar repositorio
2. Build command: `pnpm build`
3. Publish directory: `.output/public`

## Troubleshooting

### Build Errors

```bash
# Limpiar cache
rm -rf .nuxt node_modules .output
pnpm install
pnpm build
```

### Type Errors

```bash
# Regenerar tipos
pnpm postinstall
```

### Module Not Found

```bash
# Verificar instalación
pnpm list <package-name>

# Reinstalar
pnpm add <package-name>
```

## Best Practices

### 1. Commits Pequeños y Frecuentes
- Commits atómicos (una cosa a la vez)
- Commits frecuentes (no acumular cambios)
- Messages descriptivos

### 2. Code Review Obligatorio
- Toda feature debe pasar por review
- Al menos un aprobador
- Responder a comentarios

### 3. Testing Antes de Merge
- Build exitoso
- Linting sin errores
- Tests passing (cuando estén implementados)

### 4. Documentación Actualizada
- Actualizar docs con nuevas features
- Comentar código complejo
- Mantener README actualizado

### 5. Performance First
- Optimizar imágenes
- Lazy loading
- Code splitting
- Memoización cuando corresponde

### 6. Seguridad
- Nunca commitear secrets
- Validar inputs
- Sanitizar datos
- Usar HTTPS en producción
