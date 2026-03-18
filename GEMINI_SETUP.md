# Configuración de la API de Gemini

## 📋 Requisitos previos

- Cuenta de Google
- API Key de Gemini (obtén una en [Google AI Studio](https://makersuite.google.com/app/apikey))
- Repositorio en GitHub (para despliegue en GitHub Pages)

## 🔧 Configuración Local (Desarrollo)

1. **Copia el archivo de ejemplo:**
   ```bash
   cp .env.example .env
   ```

2. **Agrega tu API Key en el archivo `.env`:**
   ```
   VITE_GEMINI_API_KEY=tu-api-key-aqui
   ```

3. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

## 🚀 Configuración para Producción (GitHub Pages)

### 1. Configura el Secret en GitHub

1. Ve a tu repositorio en GitHub
2. Navega a **Settings** → **Secrets and variables** → **Actions**
3. Click en **New repository secret**
4. Nombre: `GEMINI_API_KEY`
5. Valor: Tu API Key de Gemini
6. Click en **Add secret**

### 2. El workflow está configurado

El archivo `.github/workflows/deploy.yml` ya está configurado para:
- Tomar la variable `GEMINI_API_KEY` de los secrets de GitHub
- Exponerla como `VITE_GEMINI_API_KEY` durante el build
- Compilarla en el código de producción

### 3. Despliega tu aplicación

Cada push a la rama `main` activará automáticamente el despliegue a GitHub Pages.

## 📁 Estructura de archivos

```
src/
├── config/
│   └── config.js          # Configuración centralizada de la API
└── components/
    └── GeminiExample.jsx  # Componente de ejemplo
```

## 🎯 Uso básico

### En la aplicación principal (Página de Emociones):

La página [Emotions.jsx](src/pages/Emotions.jsx) ya incluye la integración con Gemini. Los usuarios pueden:

1. Seleccionar las emociones que están sintiendo
2. Escribir un texto opcional describiendo sus sentimientos
3. Clickear "Generar Composición"
4. Ver el poema generado por la IA
5. Copiar el poema o crear uno nuevo

### Importar el hook en tus propios componentes:

### Importar la configuración (uso avanzado):

```javascript
import { CONFIG, getGeminiURL, isConfigured } from './config/config';
```

### Usar el hook personalizado (recomendado):

```javascript
import { useGemini } from './hooks/useGemini
```javascript
import { useGemini } from './components/GeminiExample';

function MyComponent() {
  const { generateContent, loading, error } = useGemini();
  
  const handleGenerate = async () => {
    try {
      const response = await generateContent('Escribe un poema');
      console.log(response);
    } catch (err) {
      console.error('Error:', err);
    }
  };
  
  return (
    <button onClick={handleGenerate} disabled={loading}>
      {loading ? 'Generando...' : 'Generar'}
    </button>
  );
}
```

### Hacer una petición manual:

```javascript
import { getGeminiURL } from './config/config';

const response = await fetch(getGeminiURL(), {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    contents: [{
      parts: [{
        text: 'Tu prompt aquí'
      }]
    }]
  })
});

const data = await response.json();
```

## ⚠️ Notas importantes

1. **Seguridad**: La API Key se compila en el código de producción. Para aplicaciones sensibles, considera usar un backend proxy.

2. **Rate Limits**: Gemini tiene límites de tasa. Implementa throttling si esperas mucho tráfico.

3. **Variables de entorno**: 
   - En Vite, las variables deben tener el prefijo `VITE_` para ser expuestas al cliente
   - Las variables se compilan en tiempo de build, no son dinámicas

4. **GitHub Pages**: Recuerda que la API Key estará visible en el código compilado. Para mayor seguridad, usa un proxy backend.

## 🔍 Verificar la configuración

Para verificar que todo está configurado correctamente:

```javascript
import { isConfigured } from './config/config';

if (isConfigured()) {
  console.log('✅ API de Gemini configurada correctamente');
} else {
  console.warn('⚠️ API de Gemini no configurada');
}
```

## 📚 Recursos adicionales

- [Documentación de Gemini API](https://ai.google.dev/docs)
- [Documentación de Vite - Variables de entorno](https://vitejs.dev/guide/env-and-mode.html)
- [GitHub Actions - Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
