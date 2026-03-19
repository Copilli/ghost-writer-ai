# ghost-writer-ai

Ghost Writer AI transforma emociones y desahogos personales en composiciones poeticas usando `copilli-api-gateway`.

## Arquitectura actual

Este frontend ya no llama directamente a Gemini.
Toda la generacion se hace a traves del gateway en:

- `POST /api/ghost-writer-ai/gemini/compose`

La pagina principal de generacion es:

- `src/pages/Emotions.jsx`

## Variables de entorno

Copia `.env.example` a `.env`.

Opciones disponibles:

```env
# Opcion 1: gateway local
# VITE_API_GATEWAY_URL=http://localhost:3000

# Opcion 2: servicio desplegado
VITE_API_GATEWAY_URL=https://copilli-api-gateway.onrender.com
```

## Desarrollo local

```bash
npm install
npm run dev
```

La app usa GitHub Pages base path:

- `/ghost-writer-ai/`

## Despliegue

El workflow de GitHub Actions construye la app con:

- `VITE_API_GATEWAY_URL=https://copilli-api-gateway.onrender.com`

No necesitas inyectar una secret al frontend.

## Flujo funcional

1. El usuario selecciona emociones y escribe un texto opcional.
2. El frontend envia `emotions` y `text` al gateway.
3. El gateway construye el prompt y llama a Gemini con la key privada del proyecto.
4. El frontend muestra la composicion devuelta.
