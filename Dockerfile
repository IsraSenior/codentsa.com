# =============================================================================
# Multi-stage Dockerfile for Nuxt 4 with pnpm
# Optimized for production deployment
# =============================================================================

# -----------------------------------------------------------------------------
# Stage 1: Base - Setup Node.js and pnpm
# -----------------------------------------------------------------------------
FROM node:20-alpine AS base

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

WORKDIR /app

# -----------------------------------------------------------------------------
# Stage 2: Dependencies - Install production dependencies
# -----------------------------------------------------------------------------
FROM base AS deps

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies with frozen lockfile
RUN pnpm install --frozen-lockfile --prod=false

# -----------------------------------------------------------------------------
# Stage 3: Builder - Build the application
# -----------------------------------------------------------------------------
FROM base AS builder

# Build arguments for Nuxt public runtime config
ARG NUXT_PUBLIC_BASE_URL
ARG NUXT_PUBLIC_DIRECTUS_URL
ARG NUXT_PUBLIC_UMAMI_HOST
ARG NUXT_PUBLIC_UMAMI_ID
ARG NUXT_PUBLIC_GOOGLE_ANALYTICS_ID
ARG NUXT_PUBLIC_META_PIXEL_ID

# Set build-time environment variables
ENV NUXT_PUBLIC_BASE_URL=${NUXT_PUBLIC_BASE_URL}
ENV NUXT_PUBLIC_DIRECTUS_URL=${NUXT_PUBLIC_DIRECTUS_URL}
ENV NUXT_PUBLIC_UMAMI_HOST=${NUXT_PUBLIC_UMAMI_HOST}
ENV NUXT_PUBLIC_UMAMI_ID=${NUXT_PUBLIC_UMAMI_ID}
ENV NUXT_PUBLIC_GOOGLE_ANALYTICS_ID=${NUXT_PUBLIC_GOOGLE_ANALYTICS_ID}
ENV NUXT_PUBLIC_META_PIXEL_ID=${NUXT_PUBLIC_META_PIXEL_ID}

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy application source
COPY . .

# Build the application
RUN pnpm run build

# -----------------------------------------------------------------------------
# Stage 4: Production - Minimal runtime image
# -----------------------------------------------------------------------------
FROM base AS production

# Set production environment
ENV NODE_ENV=production \
    PORT=3000 \
    HOST=0.0.0.0

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nuxtjs -u 1001

WORKDIR /app

# Copy built application from builder
COPY --from=builder --chown=nuxtjs:nodejs /app/.output ./.output
COPY --from=builder --chown=nuxtjs:nodejs /app/package.json ./package.json

# Switch to non-root user
USER nuxtjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application with dumb-init
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", ".output/server/index.mjs"]
