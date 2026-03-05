import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Tu Espejo Emocional
        </h1>
        <p className="text-2xl text-gray-600 mb-8">
          Transforma tus emociones en arte con IA
        </p>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
          Ghost Writer AI es tu compañero para procesar emociones complejas de forma creativa y segura.
        </p>
        <Link
          to="/emotions"
          className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 transition text-lg"
        >
          Comienza Ahora
        </Link>
      </section>

      {/* The Problem Section */}
      <section className="mb-16 bg-red-50 p-8 rounded-lg border-l-4 border-red-500">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">🧠 El Problema</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Incapacidad de Expresión</h3>
            <p className="text-gray-600">
              Muchas personas no saben cómo nombrar o articular emociones complejas como la ansiedad, tristeza o siendo abrumadas.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Falta de Espacios Seguros</h3>
            <p className="text-gray-600">
              Compartir sentimientos íntimos puede resultar incómodo o riesgoso sin un interlocutor de confianza.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Impacto Mental</h3>
            <p className="text-gray-600">
              Guardar emociones sin procesar causa estrés crónico y daña la salud mental a largo plazo.
            </p>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="mb-16 bg-indigo-50 p-8 rounded-lg border-l-4 border-primary">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">💡 Nuestra Solución</h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-700 mb-6">
            <strong>Ghost Writer AI</strong> utiliza inteligencia artificial como un <strong>"espejo emocional"</strong>. 
            Escribes un desahogo libre sobre tus sentimientos y nuestra IA lo transforma en un poema o canción poética.
          </p>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">¿Cómo funciona?</h3>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">1</span>
              <div>
                <h4 className="font-bold text-gray-900">Escribe tu Desahogo</h4>
                <p className="text-gray-600">Expresa libremente cómo te sientes, sin temor a ser juzgado.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">2</span>
              <div>
                <h4 className="font-bold text-gray-900">Selecciona tu Emoción</h4>
                <p className="text-gray-600">Elige las emociones que mejor describen tu estado.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">3</span>
              <div>
                <h4 className="font-bold text-gray-900">Transforma en Arte</h4>
                <p className="text-gray-600">La IA convierte tu desahogo en un poema o canción hermosa.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">4</span>
              <div>
                <h4 className="font-bold text-gray-900">Procesa tu Sentir</h4>
                <p className="text-gray-600">Visualiza tus emociones de forma artística, facilitando la catarsis.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">✨ Beneficios</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-secondary">
            <h3 className="text-xl font-bold text-gray-900 mb-3">🔒 Privacidad Garantizada</h3>
            <p className="text-gray-600">
              Tus desahogos son privados por defecto. No se guardan ni comparten sin tu consentimiento.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-secondary">
            <h3 className="text-xl font-bold text-gray-900 mb-3">🎨 Creatividad Terapéutica</h3>
            <p className="text-gray-600">
              Transforma emociones en arte. Poemas y canciones que reflejan tu verdadero sentir.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-secondary">
            <h3 className="text-xl font-bold text-gray-900 mb-3">🧘 Catarsis Emocional</h3>
            <p className="text-gray-600">
              Procesa tus sentimientos de forma segura, ayudando a tu bienestar mental.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-secondary">
            <h3 className="text-xl font-bold text-gray-900 mb-3">💬 Sin Juzgamiento</h3>
            <p className="text-gray-600">
              Un "espejo" que escucha sin juzgar. Tu IA personal de apoyo emocional.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white p-12 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">¿Listo para expresar tu sentir?</h2>
        <p className="text-lg mb-6 opacity-90">
          Comienza tu viaje hacia la catarsis emocional con Ghost Writer AI.
        </p>
        <Link
          to="/emotions"
          className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition text-lg"
        >
          Ir a la Herramienta
        </Link>
      </section>
    </div>
  )
}
