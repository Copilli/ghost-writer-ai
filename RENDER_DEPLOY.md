# Guia de despliegue con Copilli API Gateway

Esta app ya no usa una API key directa en el frontend.
Toda la generacion pasa por `copilli-api-gateway`.

## 1. Configurar el gateway en Render

En `copilli-api-gateway` configura al menos:

```env
NODE_ENV=production
GHOST_WRITER_GEMINI_API_KEY=tu-api-key-de-ghost-writer
ALLOWED_ORIGINS=https://tuusuario.github.io/ghost-writer-ai,https://tuusuario.github.io/kaseki
RATE_LIMIT_MAX=50
RATE_LIMIT_WINDOW=15
GEMINI_MODEL=gemini-2.5-flash
```

Si quieres, tambien puedes usar `API_SECRET_KEY`, pero ya no es necesario para el frontend.

## 2. Verificar el gateway

Health check:

```bash
curl https://copilli-api-gateway.onrender.com/health
```

Prueba del endpoint de Ghost Writer:

```bash
curl -X POST https://copilli-api-gateway.onrender.com/api/ghost-writer-ai/gemini/compose \
  -H "Content-Type: application/json" \
  -d "{\"emotions\":[\"hope\",\"joy\"],\"text\":\"Hoy quiero volver a creer en mi proceso.\"}"
```

## 3. Configurar GitHub Actions en ghost-writer-ai

El workflow usa:

```yaml
env:
  VITE_API_GATEWAY_URL: https://copilli-api-gateway.onrender.com
```

No necesitas guardar `API_SECRET_KEY` en GitHub Actions para este frontend.

## 4. Configuracion local

En `.env`:

```env
# Opcion 1: gateway local
# VITE_API_GATEWAY_URL=http://localhost:3000

# Opcion 2: servicio desplegado
VITE_API_GATEWAY_URL=https://copilli-api-gateway.onrender.com
```

## 5. Contrato actual del frontend

La pagina `src/pages/Emotions.jsx` envia:

```json
{
  "emotions": ["joy", "hope"],
  "text": "Texto opcional",
  "temperature": 0.8,
  "maxTokens": 1024
}
```

Y consume:

```json
{
  "success": true,
  "data": {
    "text": "poema generado"
  }
}
```
