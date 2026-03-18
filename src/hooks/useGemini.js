import { useState } from 'react';
import { CONFIG, getGeminiURL, isConfigured } from '../config/config';

/**
 * Hook personalizado para usar la API de Gemini
 * En producción usa el API Gateway de Copilli (Render)
 * En desarrollo puede usar la API directamente o el gateway local
 */
export const useGemini = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateContent = async (prompt, options = {}) => {
    if (!isConfigured()) {
      throw new Error('API de Gemini no configurada correctamente');
    }

    setLoading(true);
    setError(null);

    const {
      temperature = 0.7,
      maxRetries = CONFIG.MAX_RETRIES,
      initialDelay = CONFIG.INITIAL_DELAY
    } = options;

    let lastError;
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        let response;
        
        // Usar API Gateway de Copilli (Render)
        if (CONFIG.USE_GATEWAY) {
          const headers = {
            'Content-Type': 'application/json',
          };
          
          // Agregar API key si está configurada
          if (CONFIG.API_SECRET_KEY) {
            headers['X-API-Key'] = CONFIG.API_SECRET_KEY;
          }
          
          response = await fetch(`${CONFIG.API_GATEWAY_URL}/api/gemini/generate`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
              prompt,
              temperature,
              maxTokens: 1024
            })
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error en el API Gateway');
          }
          
          const data = await response.json();
          setLoading(false);
          return data.data.text;
          
        } else {
          // Desarrollo: llamar directamente a Gemini
          response = await fetch(getGeminiURL(), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: prompt
                }]
              }],
              generationConfig: {
                temperature,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
              }
            })
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Error en la API de Gemini');
          }

          const data = await response.json();
          setLoading(false);
          return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        }
      } catch (err) {
        lastError = err;
        
        // Si no es el último intento, esperar antes de reintentar
        if (attempt < maxRetries - 1) {
          const delay = initialDelay * Math.pow(2, attempt);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    setError(lastError);
    setLoading(false);
    throw lastError;
  };

  return { generateContent, loading, error };
};
