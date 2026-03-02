#!/usr/bin/env bash
# =============================================================================
# Zero-Downtime Deployment Script for Codentsa.es
# =============================================================================
# Usage: ./deploy.sh [image-tag]
# Example: ./deploy.sh ghcr.io/israsenior/codentsa.com:main-abc123
# =============================================================================

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
COMPOSE_FILE="docker-compose.yml"
SERVICE_NAME="nuxt"
HEALTH_ENDPOINT="https://codentsa.es/api/health"
HEALTH_TIMEOUT=60
HEALTH_INTERVAL=5

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

# =============================================================================
# Helper Functions
# =============================================================================

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if service is healthy
check_health() {
    local max_attempts=$((HEALTH_TIMEOUT / HEALTH_INTERVAL))
    local attempt=1

    log_info "Checking service health (timeout: ${HEALTH_TIMEOUT}s)..."

    while [ $attempt -le $max_attempts ]; do
        if curl -f -s -o /dev/null -w "%{http_code}" "$HEALTH_ENDPOINT" | grep -q "200"; then
            log_success "Service is healthy!"
            return 0
        fi

        log_info "Health check attempt $attempt/$max_attempts failed, waiting ${HEALTH_INTERVAL}s..."
        sleep $HEALTH_INTERVAL
        attempt=$((attempt + 1))
    done

    log_error "Service health check failed after ${HEALTH_TIMEOUT}s"
    return 1
}

# Get current container count
get_container_count() {
    docker compose -f "$COMPOSE_FILE" ps -q "$SERVICE_NAME" | wc -l
}

# =============================================================================
# Main Deployment Process
# =============================================================================

main() {
    cd "$PROJECT_ROOT"

    log_info "Starting zero-downtime deployment for codentsa.es"
    log_info "Working directory: $PROJECT_ROOT"

    # Validate image tag if provided
    if [ $# -ge 1 ]; then
        NEW_IMAGE="$1"
        log_info "Using image: $NEW_IMAGE"
        export NUXT_IMAGE="$NEW_IMAGE"
    else
        log_info "No image specified, will use docker-compose.yml default"
    fi

    # Check if compose file exists
    if [ ! -f "$COMPOSE_FILE" ]; then
        log_error "Docker Compose file not found: $COMPOSE_FILE"
        exit 1
    fi

    # Load environment variables
    if [ -f .env ]; then
        log_info "Loading environment variables from .env"
        set -a
        source .env
        set +a
    else
        log_warning "No .env file found, using environment defaults"
    fi

    # Step 1: Pull new image
    log_info "Step 1: Pulling new image..."
    if ! docker compose -f "$COMPOSE_FILE" pull "$SERVICE_NAME"; then
        log_error "Failed to pull new image"
        exit 1
    fi
    log_success "Image pulled successfully"

    # Step 2: Get current container count
    CURRENT_COUNT=$(get_container_count)
    log_info "Current container count: $CURRENT_COUNT"

    if [ "$CURRENT_COUNT" -eq 0 ]; then
        # No containers running, just start
        log_info "No containers running, starting service..."
        docker compose -f "$COMPOSE_FILE" up -d "$SERVICE_NAME"
    else
        # Step 3: Scale up to 2 instances
        log_info "Step 2: Scaling up to 2 instances..."
        if ! docker compose -f "$COMPOSE_FILE" up -d --scale "$SERVICE_NAME=2" --no-recreate "$SERVICE_NAME"; then
            log_error "Failed to scale up"
            exit 1
        fi
        log_success "Scaled up to 2 instances"

        # Wait for new container to be healthy
        sleep 10

        # Step 4: Check health of new container
        log_info "Step 3: Checking health of new container..."
        if ! check_health; then
            log_error "New container failed health check"
            log_warning "Rolling back to 1 instance..."
            docker compose -f "$COMPOSE_FILE" up -d --scale "$SERVICE_NAME=1" --no-recreate "$SERVICE_NAME"
            exit 1
        fi

        # Step 5: Scale down to 1 instance (removes old container)
        log_info "Step 4: Scaling down to 1 instance..."
        if ! docker compose -f "$COMPOSE_FILE" up -d --scale "$SERVICE_NAME=1" --no-recreate "$SERVICE_NAME"; then
            log_error "Failed to scale down"
            exit 1
        fi
        log_success "Scaled down to 1 instance"
    fi

    # Step 6: Final health check
    log_info "Step 5: Final health check..."
    if ! check_health; then
        log_error "Final health check failed"
        exit 1
    fi

    # Step 7: Cleanup old images
    log_info "Step 6: Cleaning up old images..."
    docker image prune -f > /dev/null 2>&1 || true
    log_success "Cleanup complete"

    # Success!
    log_success "========================================"
    log_success "Deployment completed successfully!"
    log_success "========================================"
    log_info "Service: $SERVICE_NAME"
    log_info "Health endpoint: $HEALTH_ENDPOINT"
    log_info "Timestamp: $(date -u +"%Y-%m-%d %H:%M:%S UTC")"

    # Send success notification
    if [ -f "${SCRIPT_DIR}/notifications/notify.sh" ]; then
        "${SCRIPT_DIR}/notifications/notify.sh" "success" "Deployment completed successfully" || true
    fi
}

# =============================================================================
# Error Handler
# =============================================================================

error_handler() {
    log_error "Deployment failed at line $1"

    # Send failure notification
    if [ -f "${SCRIPT_DIR}/notifications/notify.sh" ]; then
        "${SCRIPT_DIR}/notifications/notify.sh" "error" "Deployment failed at line $1" || true
    fi

    exit 1
}

trap 'error_handler $LINENO' ERR

# =============================================================================
# Execute
# =============================================================================

main "$@"
