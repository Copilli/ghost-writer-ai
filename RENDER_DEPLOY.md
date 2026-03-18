# Guía de Despliegue del API Gateway en Render

Esta guía te ayudará a desplegar el **Copilli API Gateway** en Render para tener todas las API keys seguras en un solo lugar.

## 📋 Prerrequisitos

1. Cuenta en [Render.com](https://render.com) (gratis)
2. Repositorio `copilli-api-gateway` en GitHub
3. API keys de los servicios (Gemini, OpenAI, etc.)

## 🚀 Pasos de Despliegue

### 1. Preparar el Repositorio

```bash
cd copilli-api-gateway

# Inicializar git si no está hecho
git init
git add .
git commit -m "Initial commit"

# Crear repositorio en GitHub y subir
git remote add origin https://github.com/Copilli/copilli-api-gateway.git
git branch -M main
git push -u origin main
```

### 2. Desplegar en Render

#### Opción A: Blueprint (Automático - Recomendado)

1. Ve a [Render Dashboard](https://dashboard.render.com)
2. Click en **"New"** → **"Blueprint"**
3. Conecta tu cuenta de GitHub si no lo has hecho
4. Selecciona el repositorio `copilli-api-gateway`
5. Render detectará automáticamente `render.yaml`
6. Click en **"Apply"**

#### Opción B: Manual

1. Ve a [Render Dashboard](https://dashboard.render.com)
2. Click en **"New"** → **"Web Service"**
3. Conecta tu repositorio `copilli-api-gateway`
4. Configura:
   - **Name**: `copilli-api-gateway`
   - **Region**: Oregon (US West) o el más cercano
   - **Branch**: `main`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free` (o el que prefieras)

5. Click en **"Create Web Service"**

### 3. Configurar Variables de Entorno

Una vez desplegado el servicio:

1. En el dashboard de tu servicio, ve a **"Environment"** en el menú lateral
2. Click en **"Add Environment Variable"**
3. Agrega las siguientes variables:

```
NODE_ENV = production

GEMINI_API_KEY = [tu-api-key-de-gemini]

API_SECRET_KEY = [genera-una-clave-aleatoria-segura]

ALLOWED_ORIGINS = https://copilli.github.io,https://otro-dominio.com

RATE_LIMIT_MAX = 50

RATE_LIMIT_WINDOW = 15
```

**Generar API_SECRET_KEY segura:**
```bash
# En tu terminal local:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

4. Click en **"Save Changes"**

El servicio se redesplegará automáticamente con las nuevas variables.

### 4. Obtener la URL del API Gateway

Una vez desplegado, Render te dará una URL como:
```
https://copilli-api-gateway.onrender.com
```

Esta será la URL base para todas tus peticiones.

### 5. Verificar el Despliegue

#### Health Check
```bash
curl https://copilli-api-gateway.onrender.com/health
```

Deberías ver:
```json
{
  "status": "ok",
  "timestamp": "2026-03-18T10:30:00.000Z",
  "services": {
    "gemini": "configured",
    "openai": "not configured"
  },
  "environment": "production"
}
```

#### Test de Gemini
```bash
curl -X POST https://copilli-api-gateway.onrender.com/api/gemini/generate \
  -H "Content-Type: application/json" \
  -H "X-API-Key: tu-secret-key" \
  -d '{"prompt": "Escribe un haiku sobre la programación"}'
```

## 🔧 Configurar tus Proyectos Frontend

### Para ghost-writer-ai

1. **GitHub Actions** (para GitHub Pages):

Edita `.github/workflows/deploy.yml`:
```yaml
- name: Build
  env:
    VITE_USE_GATEWAY: true
    VITE_API_GATEWAY_URL: https://copilli-api-gateway.onrender.com
    VITE_API_SECRET_KEY: ${{ secrets.API_SECRET_KEY }}
  run: npm run build
```

Agrega el secret en GitHub:
- Ve a **Settings** → **Secrets** → **Actions**
- Agrega `API_SECRET_KEY` con el valor del gateway

2. **Desarrollo Local**:

Edita tu `.env`:
```env
VITE_USE_GATEWAY=true
VITE_API_GATEWAY_URL=http://localhost:3000
VITE_API_SECRET_KEY=tu-secret-key-local
```

Para desarrollo, puedes ejecutar el gateway localmente o apuntar al de producción.

### Para otros proyectos

Cualquier proyecto de Copilli puede usar el gateway:

```javascript
const response = await fetch('https://copilli-api-gateway.onrender.com/api/gemini/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'tu-secret-key'
  },
  body: JSON.stringify({
    prompt: 'Tu prompt aquí',
    temperature: 0.7
  })
});

const data = await response.json();
console.log(data.data.text);
```

## 🔄 Actualizaciones Automáticas

Render está configurado para auto-desplegar cuando haces push a `main`:

```bash
git add .
git commit -m "Update: descripción del cambio"
git push
```

Render detectará el cambio y redesplegará automáticamente.

## 📊 Monitoreo

En el dashboard de Render puedes ver:

- **Logs**: Logs en tiempo real de tu servicio
- **Metrics**: CPU, memoria, requests
- **Events**: Historial de despliegues
- **Settings**: Configuración y variables

## ⚠️ Plan Free de Render

El plan free tiene algunas limitaciones:

- **Sleep después de inactividad**: El servicio "duerme" después de 15 minutos sin uso
- **Primera petición lenta**: Tarda ~30 segundos en "despertar"
- **750 horas/mes**: Suficiente para proyectos pequeños

Para evitar el sleep, considera:
1. Actualizar a plan pagado ($7/mes por servicio)
2. Usar un servicio de health check (como UptimeRobot)

## 🆘 Solución de Problemas

### Error: "Build failed"
- Verifica que `package.json` tenga las dependencias correctas
- Revisa los logs de build en Render

### Error: "API key not configured"
- Verifica que agregaste `GEMINI_API_KEY` en Environment Variables
- Asegúrate de que guardaste los cambios y se redesplegó

### Error: "CORS error"
- Agrega tu dominio a `ALLOWED_ORIGINS`
- Formato: `https://dominio1.com,https://dominio2.com` (sin espacios)

### Error: "Too many requests"
- Ajusta `RATE_LIMIT_MAX` si necesitas más peticiones
- O espera 15 minutos (window por defecto)

### Servicio muy lento
- El plan free "duerme" después de inactividad
- Primera petición toma ~30 segundos en despertar
- Considera actualizar a plan pagado

## 🔐 Seguridad

### Rotar API Keys

Si necesitas cambiar una API key:

1. Genera nueva key en el servicio (Google AI Studio, etc.)
2. Actualiza la variable en Render
3. Guarda los cambios (se redesplega automáticamente)
4. Revoca la key antigua

### Rotar Secret Key

Si tu `API_SECRET_KEY` se compromete:

1. Genera una nueva: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
2. Actualiza en Render
3. Actualiza en todos tus proyectos frontend
4. Redesplega todos los frontends

## 📚 Recursos

- [Documentación de Render](https://render.com/docs)
- [Render Status](https://status.render.com/)
- [Pricing de Render](https://render.com/pricing)
- [Community Forum](https://community.render.com/)

---

¿Necesitas ayuda? Contacta al equipo de Copilli
