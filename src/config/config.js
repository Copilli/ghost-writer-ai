// Configuracion centralizada para la aplicacion
export const CONFIG = {
  API_GATEWAY_URL: (import.meta.env.VITE_API_GATEWAY_URL || 'http://localhost:3000').replace(/\/$/, ''),
  MAX_RETRIES: 3,
  INITIAL_DELAY: 1000
}

export const getGhostWriterComposeURL = () => `${CONFIG.API_GATEWAY_URL}/api/ghost-writer-ai/gemini/compose`

export const isConfigured = () => {
  if (!CONFIG.API_GATEWAY_URL) {
    console.warn('API_GATEWAY_URL no esta configurada')
    return false
  }

  return true
}
