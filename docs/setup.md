# Setup e Instalación

## Requisitos Previos

### Software Necesario
- **Node.js**: v18.x o superior (recomendado v20.x LTS)
- **pnpm**: v8.x o superior
- **Git**: Para control de versiones

### Verificar Instalación
```bash
node --version  # v18.0.0 o superior
pnpm --version  # 8.0.0 o superior
git --version   # Cualquier versión reciente
```

## Instalación Inicial

### 1. Clonar el Repositorio
```bash
git clone <repository-url>
cd codentsa.com
```

### 2. Instalar Dependencias
```bash
pnpm install
```

Este comando instalará todas las dependencias definidas en `package.json`:
- Nuxt 4 y Vue 3
- Tailwind CSS v4
- Pinia para estado global
- Heroicons para iconografía
- ESLint y Prettier para code quality

### 3. Configurar Variables de Entorno
Copiar el archivo de ejemplo y configurar las variables:
```bash
cp .env.example .env
```

Editar `.env` con tus credenciales:
```env
# Directus CMS
NUXT_DIRECTUS_URL=https://your-directus-instance.com
NUXT_DIRECTUS_TOKEN=your_directus_token

# Redsys Payment Gateway
NUXT_REDSYS_MERCHANT_CODE=999008881
NUXT_REDSYS_TERMINAL=001
NUXT_REDSYS_SECRET_KEY=your_secret_key
NUXT_REDSYS_ENVIRONMENT=test # o 'production'

# Analytics
NUXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
NUXT_PUBLIC_META_PIXEL_ID=123456789012345
```

### 4. Iniciar Servidor de Desarrollo
```bash
pnpm dev
```

El sitio estará disponible en: `http://localhost:3000`

## Scripts Disponibles

### Desarrollo
```bash
pnpm dev
```
Inicia el servidor de desarrollo con hot-reload.

### Build
```bash
pnpm build
```
Genera el build de producción optimizado.

### Preview
```bash
pnpm preview
```
Preview del build de producción localmente.

### Generate
```bash
pnpm generate
```
Genera sitio estático (SSG) para deployment en hosting estático.

### Code Quality
```bash
# Ejecutar linter
pnpm lint

# Auto-fix problemas de linting
pnpm lint:fix

# Formatear código con Prettier
pnpm format
```

## Configuración del Editor

### VS Code (Recomendado)

#### Extensiones Recomendadas
Crear `.vscode/extensions.json`:
```json
{
  "recommendations": [
    "vue.volar",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "editorconfig.editorconfig"
  ]
}
```

#### Settings
Crear `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["class:\\s*['\"`]([^'\"`]*)['\"`]", "([^'\"`]*)"]
  ]
}
```

## Verificación de la Instalación

### 1. Servidor de Desarrollo
El servidor debería arrancar sin errores:
```bash
pnpm dev
```

### 2. Build
Verificar que el build se completa exitosamente:
```bash
pnpm build
```

### 3. Linting
Verificar que no hay errores de linting:
```bash
pnpm lint
```

### 4. Formato
Verificar que el código está correctamente formateado:
```bash
pnpm format
```

## Solución de Problemas

### Error: "Cannot find module"
```bash
# Limpiar cache de pnpm y reinstalar
rm -rf node_modules .nuxt
pnpm install
```

### Error: "Port 3000 already in use"
```bash
# Cambiar el puerto
PORT=3001 pnpm dev
```

### Errores de TypeScript
Nuxt genera tipos automáticamente. Si hay errores:
```bash
# Regenerar tipos
pnpm postinstall
```

### Errores de Tailwind CSS
Si los estilos no se aplican:
1. Verificar que `main.css` está importado en `nuxt.config.ts`
2. Limpiar cache: `rm -rf .nuxt`
3. Reiniciar servidor de desarrollo

## Deployment

### Vercel (Recomendado para Nuxt)
1. Conectar repositorio en Vercel
2. Configurar variables de entorno
3. Deploy automático en cada push

### Netlify
1. Conectar repositorio en Netlify
2. Build command: `pnpm build`
3. Publish directory: `.output/public`

### Servidor Propio (Node.js)
```bash
# Build
pnpm build

# Iniciar servidor
node .output/server/index.mjs
```

## Próximos Pasos

1. Revisar [architecture.md](./architecture.md) para entender la estructura
2. Leer [styling.md](./styling.md) para el sistema de diseño
3. Consultar [components.md](./components.md) para crear componentes
4. Ver [development-workflow.md](./development-workflow.md) para el flujo de trabajo
