# Configuracion actual de Ghost Writer AI

Ghost Writer AI ya no usa Gemini directo en el frontend.

## Lo que usa ahora

- `VITE_API_GATEWAY_URL`
- endpoint: `POST /api/ghost-writer-ai/gemini/compose`

## Desarrollo local

```env
# VITE_API_GATEWAY_URL=http://localhost:3000
VITE_API_GATEWAY_URL=https://copilli-api-gateway.onrender.com
```

## Produccion

GitHub Actions construye con:

```yaml
VITE_API_GATEWAY_URL: https://copilli-api-gateway.onrender.com
```

Las API keys reales viven solo en `copilli-api-gateway`.
