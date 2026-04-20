# ghost-writer-ai

Ghost Writer AI transforma emociones y desahogos personales en composiciones poeticas usando `copilli-api-gateway`.

<<<<<<< Updated upstream
## Arquitectura actual

Este frontend ya no llama directamente a Gemini.
Toda la generacion se hace a traves del gateway en:
=======
## Problema a resolver
- Las emociones y pensamientos íntimos suelen quedarse guardados y no son expresados.
- Compartirlos puede resultar incómodo o riesgoso para algunas personas.
- No existe una forma accesible de transformar ese desahogo en algo creativo y terapéutico.

## Nuestra solución
Usar la inteligencia artificial como un **"espejo emocional"**. El usuario escribe un texto libre donde expresa cómo se siente y la IA lo transforma en un poema o una canción. De este modo:
>>>>>>> Stashed changes

- `POST /api/ghost-writer-ai/gemini/compose`

La pagina principal de generacion es:

<<<<<<< Updated upstream
- `src/pages/Emotions.jsx`
=======
## Despliegue en GitHub Pages
>>>>>>> Stashed changes

## Variables de entorno

Copia `.env.example` a `.env`.

Opciones disponibles:

```env
# Opcion 1: gateway local
# VITE_API_GATEWAY_URL=http://localhost:3000

# Opcion 2: servicio desplegado
VITE_API_GATEWAY_URL=https://copilli-api-gateway.onrender.com
```

<<<<<<< Updated upstream
## Desarrollo local

=======
### Notas Importantes

- **Base Path**: Configurado para `/ghost-writer-ai/` (ajusta si tu repo tiene otro nombre)
- **SPA Routing**: Incluye configuración para que las rutas de React funcionen en GitHub Pages
- **Build Automático**: Se ejecuta automáticamente con cada push a `main`

### Estado del Build
- Configurado para GitHub Pages con `base: '/ghost-writer-ai/'`
- SPA routing habilitado para navegación correcta
- Workflow de GitHub Actions configurado para despliegue automático
- Build probado y funcionando correctamente

## Instalación y Uso

```
ghost-writer-ai/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Barra de navegación
│   │   └── Footer.jsx       # Pie de página
│   ├── pages/
│   │   ├── Home.jsx         # Página de inicio (Problema y Solución)
│   │   ├── Team.jsx         # Página de equipo (3 cards de integrantes)
│   │   └── Emotions.jsx     # Página principal (selector de emociones + texto)
│   ├── App.jsx              # App principal con enrutamiento
│   ├── App.css              # Estilos principales
│   ├── index.css            # Estilos globales (Tailwind)
│   └── main.jsx             # Punto de entrada
├── index.html               # HTML principal
├── vite.config.js           # Configuración de Vite
├── tailwind.config.js       # Configuración de Tailwind CSS
├── postcss.config.js        # Configuración de PostCSS
└── package.json             # Dependencias del proyecto
```

## Páginas de la Aplicación

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
- Botón para generar composición IA
- (Nota: La integración con IA se implementará en la próxima fase)

## Instalación y Uso

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
>>>>>>> Stashed changes
```bash
npm install
npm run dev
```

La app usa GitHub Pages base path:

- `/ghost-writer-ai/`

## Despliegue

El workflow de GitHub Actions construye la app con:

<<<<<<< Updated upstream
- `VITE_API_GATEWAY_URL=https://copilli-api-gateway.onrender.com`
=======
## Tecnologías Utilizadas
>>>>>>> Stashed changes

No necesitas inyectar una secret al frontend.

<<<<<<< Updated upstream
## Flujo funcional

1. El usuario selecciona emociones y escribe un texto opcional.
2. El frontend envia `emotions` y `text` al gateway.
3. El gateway construye el prompt y llama a Gemini con la key privada del proyecto.
4. El frontend muestra la composicion devuelta.
=======
## Funcionalidades Actuales

- Navegación multi-página con React Router
- Diseño responsive con Tailwind CSS
- Selector interactivo de emociones (10 emociones)
- Área de texto con contador de palabras
- Validación de entrada (mínimo 1 emoción seleccionada)
- Presentación clara del problema y solución
- Información del equipo con 3 cards

## Próximas Funcionalidades (Roadmap)

- [ ] Integración con API de IA (OpenAI o similar)
- [ ] Generación de poemas automáticos
- [ ] Generación de canciones
- [ ] Almacenamiento opcional de composiciones
- [ ] Sistema de audio/TTS
- [ ] Exportar resultado como PDF/audio
- [ ] Sistema de cuentas de usuario (opcional)
- [ ] Historial de emociones y tendencias
- [ ] Filtrado de contenido sensible
- [ ] Recursos de crisis/ayuda

## Privacidad y Seguridad

- Por defecto, no guardamos el desahogo de los usuarios
- Los datos no se envían a servidores terceros sin consentimiento
- Somos transparentes sobre qué información se procesa
- Cumplimos con GDPR y otras normativas de privacidad

## Equipo

- **María González** - Diseñadora UX/UI
- **Carlos Rodríguez** - Desarrollador Full Stack
- **Laura Martínez** - Especialista en IA y Psicología

## Licencia

ISC

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request.

---

**Ghost Writer AI** - Transformando emociones complejas en arte poético.
>>>>>>> Stashed changes
