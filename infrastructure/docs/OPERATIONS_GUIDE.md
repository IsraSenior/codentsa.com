# Codentsa.es - Operations Guide

Complete guide for deploying, managing, and maintaining the Codentsa.es infrastructure.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Initial Setup](#initial-setup)
- [Deployment](#deployment)
- [Monitoring](#monitoring)
- [Backups](#backups)
- [Restore Procedures](#restore-procedures)
- [Maintenance](#maintenance)
- [Troubleshooting](#troubleshooting)
- [Security](#security)

---

## Architecture Overview

### Services

- **Caddy**: Reverse proxy with automatic HTTPS (ports 80, 443, 443/udp)
- **Nuxt**: Frontend application (internal port 3000)
- **Directus**: Headless CMS (internal port 8055)
- **Umami**: Analytics platform (internal port 3000)
- **PostgreSQL (Directus)**: Database for Directus
- **PostgreSQL (Umami)**: Database for Umami
- **Backup**: Automated backup service

### Domains

- `codentsa.es` → Nuxt frontend
- `admin.codentsa.es` → Directus CMS
- `analytics.codentsa.es` → Umami analytics

### Networks

- `codentsa_proxy`: External-facing services
- `codentsa_internal`: Internal service communication
- `codentsa_database`: Database isolation (internal only)

---

## Initial Setup

### 1. Server Prerequisites

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Reboot to apply changes
sudo reboot
```

### 2. Create Deploy User

```bash
# Create deploy user
sudo useradd -m -s /bin/bash deploy
sudo usermod -aG docker deploy

# Setup SSH key for deploy user
sudo mkdir -p /home/deploy/.ssh
sudo vim /home/deploy/.ssh/authorized_keys
# Paste your public key
sudo chown -R deploy:deploy /home/deploy/.ssh
sudo chmod 700 /home/deploy/.ssh
sudo chmod 600 /home/deploy/.ssh/authorized_keys
```

### 3. Setup Project Directory

```bash
# Create project directory
sudo mkdir -p /opt/codentsa
sudo chown deploy:deploy /opt/codentsa

# Switch to deploy user
su - deploy

# Clone repository (or copy files manually)
cd /opt/codentsa
# Files will be deployed via GitHub Actions
```

### 4. Configure Environment

```bash
cd /opt/codentsa/infrastructure

# Copy and edit environment file
cp .env.example .env
vim .env

# Generate secrets
./scripts/generate-secrets.sh

# Copy generated secrets to .env
vim .env
```

### 5. Initial Deployment

```bash
# Make scripts executable
chmod +x scripts/*.sh
chmod +x scripts/backup/scripts/*.sh
chmod +x scripts/restore/*.sh
chmod +x scripts/notifications/*.sh

# Build and start services
docker compose up -d

# Check service status
docker compose ps

# View logs
docker compose logs -f
```

### 6. Configure Umami

1. Access https://analytics.codentsa.es
2. Login with default credentials (admin/umami)
3. Change admin password immediately
4. Create a new website for codentsa.es
5. Copy the Website ID
6. Update `NUXT_PUBLIC_UMAMI_ID` in `.env` and GitHub Secrets
7. Restart Nuxt service: `docker compose restart nuxt`

---

## Deployment

### Automatic Deployment (via GitHub Actions)

Every push to `main` branch triggers:

1. **Lint**: Code quality check
2. **Build**: Docker image build and push to GHCR
3. **Deploy**: Zero-downtime deployment to VPS
4. **Verify**: Health checks on all services

Required GitHub Secrets:

```
VPS_HOST=75.119.145.162
VPS_USER=deploy
DEPLOY_PATH=/opt/codentsa
SSH_PRIVATE_KEY=<private-key>

NUXT_PUBLIC_BASE_URL=https://codentsa.es
NUXT_PUBLIC_DIRECTUS_URL=https://admin.codentsa.es
NUXT_PUBLIC_UMAMI_HOST=https://analytics.codentsa.es
NUXT_PUBLIC_UMAMI_ID=<umami-website-id>

RESEND_API_KEY=<resend-key>
NOTIFICATION_EMAIL=isenior@neskeep.com
```

### Manual Deployment

```bash
cd /opt/codentsa/infrastructure

# Pull latest changes
git pull origin main

# Build new image
docker compose build nuxt

# Deploy with zero-downtime
./scripts/deploy.sh

# Or deploy with specific image
./scripts/deploy.sh ghcr.io/israsenior/codentsa.com:main-abc123
```

---

## Monitoring

### Service Health Checks

```bash
# Check all services status
docker compose ps

# View service logs
docker compose logs -f [service-name]

# Check health endpoints
curl https://codentsa.es/api/health
curl https://admin.codentsa.es/server/health
curl https://analytics.codentsa.es/api/heartbeat
```

### Resource Monitoring

```bash
# Container resource usage
docker stats

# Disk usage
df -h
docker system df

# View backup disk usage
du -sh /var/lib/docker/volumes/codentsa_backups/_data
```

### Log Management

```bash
# View Caddy logs
docker exec codentsa_caddy cat /var/log/caddy/access.log | tail -n 100

# View container logs
docker compose logs --tail=100 [service-name]

# Follow logs in real-time
docker compose logs -f --tail=50
```

---

## Backups

### Automatic Backups

- **Schedule**: Daily at 3:00 AM (Europe/Madrid)
- **Retention**: Last 7 days only
- **Cleanup**: Daily at 6:00 AM (removes backups > 7 days)

Backed up data:
- Directus PostgreSQL database
- Umami PostgreSQL database
- Directus uploads (files)
- Caddy configuration

### Manual Backup

```bash
cd /opt/codentsa/infrastructure

# Create manual backup with label
docker exec codentsa_backup /scripts/backup-manual.sh pre-deploy-v2.0

# Or enter backup container
docker exec -it codentsa_backup sh
/scripts/backup-manual.sh my-backup-label
```

### View Backups

```bash
# List all backups
docker exec codentsa_backup ls -lh /backups/daily
docker exec codentsa_backup ls -lh /backups/manual

# View backup metadata
docker exec codentsa_backup cat /backups/daily/codentsa-20250124-030000/metadata.txt

# Backup disk usage
docker exec codentsa_backup du -sh /backups/*
```

### Backup Retention

- **Daily backups**: Automatically deleted after 7 days
- **Manual backups**: Never automatically deleted (clean up manually when needed)

---

## Restore Procedures

### Full System Restore

```bash
cd /opt/codentsa/infrastructure

# List available backups
docker exec codentsa_backup ls -lh /backups/daily

# Restore from backup
./scripts/restore/restore.sh /var/lib/docker/volumes/codentsa_backups/_data/daily/codentsa-20250124-030000
```

### Restore Individual Components

#### Directus Database Only

```bash
# Extract database dump from backup
BACKUP_PATH="/var/lib/docker/volumes/codentsa_backups/_data/daily/codentsa-20250124-030000"

# Restore
gunzip -c "$BACKUP_PATH/directus_db.sql.gz" | \
docker exec -i codentsa_postgres_directus \
psql -U codentsa_directus_user -d codentsa_directus
```

#### Umami Database Only

```bash
BACKUP_PATH="/var/lib/docker/volumes/codentsa_backups/_data/daily/codentsa-20250124-030000"

gunzip -c "$BACKUP_PATH/umami_db.sql.gz" | \
docker exec -i codentsa_postgres_umami \
psql -U codentsa_umami_user -d codentsa_umami
```

---

## Maintenance

### Update Docker Images

```bash
cd /opt/codentsa/infrastructure

# Pull latest images
docker compose pull

# Restart with new images
docker compose up -d

# Remove old images
docker image prune -f
```

### Database Maintenance

```bash
# Vacuum Directus database
docker exec codentsa_postgres_directus \
psql -U codentsa_directus_user -d codentsa_directus -c "VACUUM ANALYZE;"

# Vacuum Umami database
docker exec codentsa_postgres_umami \
psql -U codentsa_umami_user -d codentsa_umami -c "VACUUM ANALYZE;"

# Check database sizes
docker exec codentsa_postgres_directus \
psql -U codentsa_directus_user -d codentsa_directus -c "\l+"
```

### Cleanup Disk Space

```bash
# Remove old Docker resources
docker system prune -a --volumes

# Remove old backups (manual backups only - daily are auto-cleaned)
docker exec codentsa_backup rm -rf /backups/manual/codentsa-old-backup-*

# Clean logs
docker exec codentsa_caddy sh -c "truncate -s 0 /var/log/caddy/*.log"
```

### Certificate Renewal

Caddy automatically renews Let's Encrypt certificates. To manually trigger renewal:

```bash
# Reload Caddy (triggers renewal check)
docker exec codentsa_caddy caddy reload --config /etc/caddy/Caddyfile
```

---

## Troubleshooting

### Service Won't Start

```bash
# Check service status
docker compose ps

# View service logs
docker compose logs [service-name]

# Check if ports are in use
sudo netstat -tulpn | grep -E ':(80|443|3000|8055)'

# Restart specific service
docker compose restart [service-name]

# Full restart
docker compose down && docker compose up -d
```

### Database Connection Issues

```bash
# Check if database is ready
docker exec codentsa_postgres_directus pg_isready
docker exec codentsa_postgres_umami pg_isready

# Check database logs
docker compose logs postgres_directus
docker compose logs postgres_umami

# Restart database
docker compose restart postgres_directus postgres_umami
```

### SSL/HTTPS Issues

```bash
# Check Caddy logs
docker compose logs caddy

# Verify DNS records
dig codentsa.es
dig admin.codentsa.es
dig analytics.codentsa.es

# Check certificate
echo | openssl s_client -connect codentsa.es:443 -servername codentsa.es 2>/dev/null | openssl x509 -noout -dates

# Reload Caddy
docker exec codentsa_caddy caddy reload --config /etc/caddy/Caddyfile
```

### High Resource Usage

```bash
# Check container stats
docker stats

# Check disk usage
df -h
docker system df

# Check logs size
docker compose logs --tail=1 | wc -l

# Restart heavy services
docker compose restart nuxt directus
```

### Backup Issues

```bash
# Check backup service logs
docker compose logs backup

# Test backup manually
docker exec codentsa_backup /scripts/backup-manual.sh test

# Check backup disk usage
docker exec codentsa_backup df -h /backups
```

---

## Security

### Regular Security Tasks

1. **Update system packages** (monthly)
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Update Docker images** (monthly)
   ```bash
   docker compose pull
   docker compose up -d
   ```

3. **Review access logs** (weekly)
   ```bash
   docker exec codentsa_caddy cat /var/log/caddy/access.log | grep -E "40[0-9]|50[0-9]"
   ```

4. **Check failed login attempts** (weekly)
   - Review Directus admin panel logs
   - Check Umami login attempts

5. **Rotate secrets** (quarterly)
   - Generate new secrets with `./scripts/generate-secrets.sh`
   - Update `.env` file
   - Recreate services: `docker compose up -d --force-recreate`

### Firewall Configuration

```bash
# Install UFW
sudo apt install ufw

# Allow SSH (change port if using non-standard)
sudo ufw allow 22/tcp

# Allow HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 443/udp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

### SSH Hardening

```bash
# Edit SSH config
sudo vim /etc/ssh/sshd_config

# Recommended settings:
# PermitRootLogin no
# PasswordAuthentication no
# PubkeyAuthentication yes
# Port 22 (or change to non-standard port)

# Restart SSH
sudo systemctl restart sshd
```

### Monitoring for Security Events

```bash
# Check for suspicious activity
docker compose logs | grep -i "error\|fail\|unauthorized\|forbidden"

# Monitor failed authentication attempts
docker compose logs directus | grep "authentication"

# Check for unusual traffic patterns
docker exec codentsa_caddy cat /var/log/caddy/access.log | \
awk '{print $1}' | sort | uniq -c | sort -rn | head -20
```

---

## Quick Reference

### Common Commands

```bash
# Start all services
docker compose up -d

# Stop all services
docker compose down

# Restart specific service
docker compose restart [service]

# View logs
docker compose logs -f [service]

# Execute command in container
docker exec -it [container] sh

# Create backup
docker exec codentsa_backup /scripts/backup-manual.sh [label]

# Deploy new version
./scripts/deploy.sh

# Check health
curl https://codentsa.es/api/health
```

### Service URLs

- Frontend: https://codentsa.es
- Admin Panel: https://admin.codentsa.es
- Analytics: https://analytics.codentsa.es

### Important Paths

- Project root: `/opt/codentsa`
- Infrastructure: `/opt/codentsa/infrastructure`
- Backups: `/var/lib/docker/volumes/codentsa_backups/_data`
- Logs: Docker container logs (view with `docker compose logs`)

---

## Support

For issues or questions:
- GitHub Issues: https://github.com/IsraSenior/codentsa.com/issues
- Email: isenior@neskeep.com

---

**Last Updated**: 2025-01-24
