# =============================================================================
# Backup Service Dockerfile
# Alpine-based image with PostgreSQL client, curl, and cron
# =============================================================================

FROM alpine:3.19

# Install required packages
RUN apk add --no-cache \
    bash \
    postgresql16-client \
    curl \
    tzdata \
    dcron \
    tar \
    gzip \
    findutils

# Set timezone
ENV TZ=Europe/Madrid
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Create backup directory
RUN mkdir -p /backups /scripts

# Copy scripts
COPY scripts/ /scripts/
RUN chmod +x /scripts/*.sh

# Copy crontab
COPY crontab /etc/crontabs/root

# Copy entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Health check
HEALTHCHECK --interval=60s --timeout=10s --start-period=30s --retries=3 \
    CMD test -f /tmp/backup-healthy || exit 1

ENTRYPOINT ["/entrypoint.sh"]
CMD ["crond", "-f", "-l", "2"]
