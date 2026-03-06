# Skill: deploy

Deploy manual a la VPS de codentsa.es. Usar cuando el usuario pida desplegar, subir a produccion, o hacer deploy.

## Instrucciones

### Paso 1: Commits atomicos y push a GitHub (si hay cambios pendientes)

Crear commits atomicos: un solo cambio logico por commit. Nunca mezclar cambios no relacionados.
```bash
# Ejemplo: si hay fix de lint + nueva feature, son 2 commits separados
git add app/app.vue
git commit -m "fix: resolve unused var in app.vue

Co-Authored-By: Claude <noreply@anthropic.com>"

git add app/components/NewComponent.vue
git commit -m "feat: add NewComponent

Co-Authored-By: Claude <noreply@anthropic.com>"

git push github main
```

### Paso 2: Pull y rebuild en la VPS
```bash
sshpass -p 'cX41k8Dt40I7' ssh -o StrictHostKeyChecking=no root@75.119.145.162 << 'ENDSSH'
  cd /root/codentsa.com
  git pull origin main
  cp -r infrastructure/* /root/infrastructure/
  cp Dockerfile /root/infrastructure/../Dockerfile
  cd /root/infrastructure
  docker compose up -d --build --force-recreate nuxt
  sleep 15
  docker ps --filter name=codentsa_nuxt --format "{{.Status}}"
  docker image prune -f
ENDSSH
```

### Paso 3: Verificar health
```bash
curl -s -o /dev/null -w "%{http_code}" https://codentsa.es/api/health
```

### Paso 4: Informar resultado al usuario

## Datos de conexion

- **Host**: 75.119.145.162
- **User**: root
- **Password**: cX41k8Dt40I7
- **Repo en VPS**: /root/codentsa.com (remote origin -> GitHub con PAT)
- **Deploy path**: /root/infrastructure
- **Docker compose**: /root/infrastructure/docker-compose.yml
- **Servicio principal**: nuxt (codentsa_nuxt)
- **Health endpoint**: https://codentsa.es/api/health
- **Sitio**: https://codentsa.es

## Notas

- El docker-compose.yml referencia `context: ..` y `dockerfile: Dockerfile` - el Dockerfile debe estar en /root/Dockerfile (un nivel arriba de infrastructure/)
- El repo en la VPS tiene remote `origin` apuntando a GitHub con PAT incluido
- Siempre pushear a `github` remote desde local antes de hacer pull en la VPS
