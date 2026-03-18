# ghost-writer-ai

**ghost-writer-ai** aborda un problema profundo: la incapacidad de comunicar sentimientos internos de forma segura y privada. Muchas personas desean desahogarse pero no siempre encuentran un espacio o interlocutor de confianza.

## 🧠 Problema a resolver
- Las emociones y pensamientos íntimos suelen quedarse guardados y no son expresados.
- Compartirlos puede resultar incómodo o riesgoso para algunas personas.
- No existe una forma accesible de transformar ese desahogo en algo creativo y terapéutico.

## 💡 Nuestra solución
Usar la inteligencia artificial como un **"espejo emocional"**. El usuario escribe un texto libre donde expresa cómo se siente y la IA lo transforma en un poema o una canción. De este modo:

- Se procesa el sentir de forma creativa.
- Se ofrece un espacio privado y seguro para la introspección.
- El resultado brinda consuelo y ayuda a la persona a poner palabras artísticas a sus emociones.

---

## 🤖 Configuración de la API de Gemini

### Desarrollo Local

1. **Copia el archivo de ejemplo:**
   ```bash
   cp .env.example .env
   ```

2. **Agrega tu API Key en `.env`:**
   ```
   VITE_USE_GATEWAY=false
   VITE_GEMINI_API_KEY=tu-api-key-aqui
   ```

3. **Obtén tu API Key en:** [Google AI Studio](https://makersuite.google.com/app/apikey)

### Producción (API Gateway de Copilli en Render) 🔒

**La API key estará completamente oculta en el servidor:**

Este proyecto usa el **[Copilli API Gateway](https://github.com/Copilli/copilli-api-gateway)**, un backend centralizado que maneja de forma segura todas las API keys de los proyectos de Copilli.

1. Despliega el API Gateway en Render (solo una vez para todos los proyectos)
2. Obtén la URL del gateway (ej: `https://copilli-api-gateway.onrender.com`)
3. Configura las variables de entorno en GitHub Pages

📚 **[Guía completa de despliegue en Render →](RENDER_DEPLOY.md)**

## 🚀 Despliegue

### Opción 1: GitHub Pages + API Gateway de Copilli (Recomendado) 🔒

1. Conecta tu repo a [Netlify](https://netlify.com)
2. Agrega `GEMINI_API_KEY` en Environment variables
3. Despliega automáticamente

**Ventaja:** La API key está oculta en el servidor y nunca se expone al público.

📚 **[Guía detallada de Netlify →](NETLIFY_DEPLOY.md)**

### Opción 2: GitHub Pages (Sin Gateway) ⚠️

Si no quieres usar el gateway (no recomendado):

1. Configura el secret `GEMINI_API_KEY` en GitHub
2. Sube a GitHub (rama `main`)
3. Ve a Settings > Pages > Selecciona "GitHub Actions"

**Nota:** La API key será visible en el código compilado.

### URL de Producción
Tu aplicación estará disponible en: `https://[tu-usuario].github.io/ghost-writer-ai/`

### Configuración Manual (si es necesario)

Si prefieres hacer el despliegue manual:

```bash
# Construir la aplicación
npm run build

# El resultado estará en la carpeta 'dist/'
# Sube el contenido de 'dist/' a la rama 'gh-pages'
```

### ⚠️ Notas Importantes

- **Base Path**: Configurado para `/ghost-writer-ai/` (ajusta si tu repo tiene otro nombre)
- **SPA Routing**: Incluye configuración para que las rutas de React funcionen en GitHub Pages
- **Build Automático**: Se ejecuta automáticamente con cada push a `main`

### ✅ Estado del Build
- ✅ Configurado para GitHub Pages con `base: '/ghost-writer-ai/'`
- ✅ SPA routing habilitado para navegación correcta
- ✅ Workflow de GitHub Actions configurado para despliegue automático
- ✅ Build probado y funcionando correctamente

## 🛠️ Instalación y Uso

```
ghost-writer-ai/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Barra de navegación
│   │   ├── Footer.jsx       # Pie de página
│   │   └── GeminiExample.jsx # Componente de ejemplo de IA
│   ├── pages/
│   │   ├── Home.jsx         # Página de inicio (Problema y Solución)
│   │   ├── Team.jsx         # Página de equipo (3 cards de integrantes)
│   │   └── Emotions.jsx     # Página principal (selector de emociones + generación con IA)
│   ├── hooks/
│   │   └── useGemini.js     # Hook personalizado para usar la API de Gemini
│   ├── config/
│   │   └── config.js        # Configuración centralizada de la API
│   ├── App.jsx              # App principal con enrutamiento
│   ├── App.css              # Estilos principales
│   ├── index.css            # Estilos globales (Tailwind)
│   └── main.jsx             # Punto de entrada
├── .env                     # Variables de entorno (local, no se sube a git)
├── .env.example             # Ejemplo de variables de entorno
├── index.html               # HTML principal
├── vite.config.js           # Configuración de Vite
├── tailwind.config.js       # Configuración de Tailwind CSS
├── postcss.config.js        # Configuración de PostCSS
├── GEMINI_SETUP.md          # Guía de configuración de Gemini
└── package.json             # Dependencias del proyecto
```

## 📖 Páginas de la Aplicación

### 1. **Página de Inicio** (`/`)
- Presenta el problema de comunicación emocional
- Explica la solución de Ghost Writer AI
- Muestra cómo funciona el proceso en 4 pasos
- Destaca los beneficios de la aplicación
- Incluye CTA para ir a la herramienta

### 2. **Página del Equipo** (`/team`)
- Información general del proyecto y misión
- 3 cards con información de integrantes:
  - **María González** - Diseñadora UX/UI
  - **Carlos Rodríguez** - Desarrollador Full Stack
  - **Laura Martínez** - Especialista en IA y Psicología
- Sección de valores del equipo

### 3. **Página de Emociones** (`/emotions`)
- Selector de múltiples emociones (10 opciones)
- Area de texto para desahogo (hasta 150 palabras, opcional)
- Contador de palabras en tiempo real
- Resumen de emociones seleccionadas
- Botón para generar composición con IA
- **Generación automática de poemas** usando Gemini AI
- Visualización del poema generado con diseño atractivo
- Opciones para copiar o crear nuevo poema

## 🛠️ Instalación y Uso

### Requisitos
- Node.js 16+ 
- npm o yarn

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/Copilli/ghost-writer-ai.git
cd ghost-writer-ai
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

La aplicación se abrirá automáticamente en `http://localhost:3000`

### Construir para producción
```bash
npm run build
```

Esto generará una carpeta `dist/` lista para desplegar.

### Previsualizar producción
```bash
npm run preview
```

## 🎨 Tecnologías Utilizadas

- **React 19** - Librería de UI
- **Vite** - Herramienta de build rápida
- **React Router DOM** - Enrutamiento
- **Tailwind CSS** - Framework de estilos
- **PostCSS** - Procesador de CSS

## 📝 Funcionalidades Actuales

✅ Navegación multi-página con React Router
✅ Diseño responsive con Tailwind CSS
✅ Selector interactivo de emociones (10 emociones)
✅ Área de texto con contador de palabras
✅ Validación de entrada (mínimo 1 emoción seleccionada)
✅ Presentación clara del problema y solución
✅ Información del equipo con 3 cards
✅ Integración con API de Gemini configurada
✅ **Generación automática de poemas** en la página de Emociones
✅ Interfaz para visualizar y copiar poemas generados
✅ Hook personalizado para uso de IA (`useGemini`)
✅ Componente de ejemplo para generación de contenido

## 🔮 Próximas Funcionalidades (Roadmap)

- [x] Integración con API de IA (Gemini)
- [x] Generación de poemas automáticos con emociones seleccionadas
- [ ] Generación de canciones (letras con estructura musical)
- [ ] Almacenamiento opcional de composiciones
- [ ] Sistema de audio/TTS
- [ ] Exportar resultado como PDF/audio
- [ ] Sistema de cuentas de usuario (opcional)
- [ ] Historial de emociones y tendencias
- [ ] Filtrado de contenido sensible
- [ ] Recursos de crisis/ayuda

## 🔒 Privacidad y Seguridad

- Por defecto, no guardamos el desahogo de los usuarios
- Los datos no se envían a servidores terceros sin consentimiento
- Somos transparentes sobre qué información se procesa
- Cumplimos con GDPR y otras normativas de privacidad

## 👥 Equipo

- **María González** - Diseñadora UX/UI
- **Carlos Rodríguez** - Desarrollador Full Stack
- **Laura Martínez** - Especialista en IA y Psicología

## 📄 Licencia

ISC

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request.

---

✨ **Ghost Writer AI** - Transformando emociones complejas en arte poético.
