// Configuración centralizada para la aplicación
export const CONFIG = {
  // API Keys - Solo para desarrollo local
  // En producción se usa el API Gateway de Copilli
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY || "",
  
  // URLs del API Gateway de Copilli
  API_GATEWAY_URL: import.meta.env.VITE_API_GATEWAY_URL || "http://localhost:3000",
  API_SECRET_KEY: import.meta.env.VITE_API_SECRET_KEY || "",
  
  // URL directa de Gemini (solo desarrollo sin gateway)
  GEMINI_API_URL: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent",
  
  // Usar API Gateway (recomendado para producción)
  USE_GATEWAY: import.meta.env.VITE_USE_GATEWAY === 'true' || import.meta.env.PROD,
  
  // Configuraciones por defecto
  MAX_RETRIES: 3,
  INITIAL_DELAY: 1000
}

// Función helper para obtener la URL completa de Gemini (solo desarrollo directo)
export const getGeminiURL = () => `${CONFIG.GEMINI_API_URL}?key=${CONFIG.GEMINI_API_KEY}`

// Validar que la configuración esté lista
export const isConfigured = () => {
  // Si usa gateway, verificar que esté configurado
  if (CONFIG.USE_GATEWAY) {
    if (!CONFIG.API_GATEWAY_URL) {
      console.warn("⚠️ API_GATEWAY_URL no está configurada");
      return false;
    }
    return true;
  }
  
  // Si no usa gateway, verificar API key directa
  if (!CONFIG.GEMINI_API_KEY) {
    console.warn("⚠️ GEMINI_API_KEY no está configurada. Por favor, configura VITE_GEMINI_API_KEY en tu archivo .env");
    return false;
  }
  
  return true;
}
