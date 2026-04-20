import { useState } from 'react'
import { CONFIG, getGhostWriterComposeURL, isConfigured } from '../config/config'
import ansiedadImg from '../assets/Miedo.png'
import tristezaImg from '../assets/Tristesa.png'
import iraImg from '../assets/Ira.png'
import alegriaImg from '../assets/Alegria.png'
import miedoImg from '../assets/Miedo.png'
import amorImg from '../assets/Amor.png'
import confusionImg from '../assets/Confusion.png'
import soledadImg from '../assets/Soledad.png'
import esperanzaImg from '../assets/Esperanza.png'

export default function Emotions() {
  const emotions = [
    { id: 'anxiety', label: 'Ansiedad', color: 'bg-yellow-100 border-yellow-400', image: ansiedadImg },
    { id: 'sadness', label: 'Tristeza', color: 'bg-blue-100 border-blue-400', image: tristezaImg },
    { id: 'anger', label: 'Ira', color: 'bg-red-100 border-red-400', image: iraImg },
    { id: 'joy', label: 'Alegría', color: 'bg-green-100 border-green-400', image: alegriaImg },
    { id: 'fear', label: 'Miedo', color: 'bg-purple-100 border-purple-400', image: miedoImg },
    { id: 'love', label: 'Amor', color: 'bg-pink-100 border-pink-400', image: amorImg },
    { id: 'confusion', label: 'Confusión', color: 'bg-orange-100 border-orange-400', image: confusionImg },
    { id: 'loneliness', label: 'Soledad', color: 'bg-indigo-100 border-indigo-400', image: soledadImg },
    { id: 'overwhelm', label: 'Abrumamiento', color: 'bg-cyan-100 border-cyan-400', image: confusionImg },
    { id: 'hope', label: 'Esperanza', color: 'bg-yellow-50 border-yellow-300', image: esperanzaImg },
  ]

  const [selectedEmotions, setSelectedEmotions] = useState([])
  const [text, setText] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [generatedPoem, setGeneratedPoem] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const normalizePoemText = (text = '') =>
    text
      .replace(/\r/g, '')
      .replace(/^\s{0,3}#{1,6}\s*/gm, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim()

  const toggleEmotion = (emotionId) => {
    setSelectedEmotions((prev) =>
      prev.includes(emotionId)
        ? prev.filter((id) => id !== emotionId)
        : [...prev, emotionId]
    )
  }

  const handleTextChange = (e) => {
    const newText = e.target.value
    setText(newText)

    const words = newText.trim().split(/\s+/).filter((word) => word.length > 0)
    setWordCount(words.length)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (selectedEmotions.length === 0) {
      alert('Por favor selecciona al menos una emoción.')
      return
    }

    if (!isConfigured()) {
      alert('La configuración del API Gateway no está lista.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(getGhostWriterComposeURL(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emotions: selectedEmotions,
          text,
          temperature: 0.8,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.error || 'Error en el API Gateway')
      }

      const data = await response.json()
      setGeneratedPoem(normalizePoemText(data?.data?.text || ''))
      setSubmitted(true)
    } catch (requestError) {
      console.error('Error al generar el poema:', requestError)
      setError(requestError)
      alert('Hubo un error al generar tu composición. Por favor, intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setSelectedEmotions([])
    setText('')
    setWordCount(0)
    setSubmitted(false)
    setGeneratedPoem('')
    setError(null)
  }

  const selectedEmotionsLabels = selectedEmotions
    .map((id) => emotions.find((emotion) => emotion.id === id)?.label)
    .filter(Boolean)

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Expresa tu Emoción
        </h1>
        <p className="text-xl text-gray-600">
          Selecciona las emociones que sientes y comparte tu desahogo.
          Transformaremos tus palabras en una composición poética.
        </p>
      </section>

      {error && (
        <div className="mb-8 p-6 bg-red-100 border border-red-400 text-red-800 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Error</h3>
          <p className="text-sm">{error.message}</p>
        </div>
      )}

      {submitted && generatedPoem && (
        <div className="mb-8 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4">
            <h3 className="text-2xl font-bold">Tu Composición Poética</h3>
            <p className="text-purple-100 text-sm mt-1">
              Basada en tus emociones: {selectedEmotionsLabels.join(', ')}
            </p>
          </div>
          <div className="p-8">
            <div className="prose prose-lg max-w-none">
              <pre className="whitespace-pre-wrap font-serif text-gray-800 leading-relaxed text-lg">
                {generatedPoem}
              </pre>
            </div>
            <div className="mt-8 flex gap-4">
              <button
                onClick={handleReset}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-bold hover:shadow-lg transition transform hover:scale-105"
              >
                Crear Otra Composición
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedPoem)
                  alert('Poema copiado al portapapeles')
                }}
                className="flex-1 bg-white border-2 border-purple-600 text-purple-600 py-3 px-6 rounded-lg font-bold hover:bg-purple-50 transition"
              >
                Copiar Poema
              </button>
            </div>
          </div>
        </div>
      )}

      {!submitted && (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-10">
            <label className="block text-2xl font-bold text-gray-900 mb-6">
              ¿Qué emociones estás sintiendo?
            </label>
            <p className="text-gray-600 mb-6">
              Selecciona una o varias emociones (puedes elegir múltiples)
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {emotions.map((emotion) => (
                <button
                  key={emotion.id}
                  type="button"
                  onClick={() => toggleEmotion(emotion.id)}
                  className={`p-4 rounded-lg border-2 transition transform hover:scale-105 flex flex-col items-center gap-2 ${
                    selectedEmotions.includes(emotion.id)
                      ? `${emotion.color} ring-2 ring-offset-2 ring-primary`
                      : 'bg-gray-50 border-gray-300 hover:border-primary'
                  }`}
                >
                  <img
                    src={emotion.image}
                    alt={emotion.label}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="text-sm font-bold text-gray-900">
                    {emotion.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <label className="block text-2xl font-bold text-gray-900 mb-2">
              Tu Desahogo (Opcional)
            </label>
            <p className="text-gray-600 mb-4">
              Escribe un texto libre de hasta 150 palabras describiendo cómo te sientes.
              Esto ayudará a la IA a crear una composición más personalizada.
            </p>
            <textarea
              value={text}
              onChange={handleTextChange}
              placeholder="Comparte tus sentimientos aquí... No hay límite de profundidad, solo mantén tu texto bajo 150 palabras."
              maxLength={1000}
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
            />
            <div className="mt-2 flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {wordCount} palabras
              </span>
              <span className={`text-sm font-bold ${
                wordCount > 150 ? 'text-red-600' : 'text-gray-600'
              }`}>
                Máximo: 150 palabras
              </span>
            </div>
          </div>

          {selectedEmotions.length > 0 && (
            <div className="mb-10 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
              <p className="text-gray-700">
                <strong>Emociones seleccionadas:</strong>{' '}
                <span className="text-primary font-bold">
                  {selectedEmotionsLabels.join(', ')}
                </span>
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={selectedEmotions.length === 0 || loading}
            className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition transform hover:scale-105 ${
              selectedEmotions.length === 0 || loading
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg'
            }`}
          >
            {loading ? 'Generando tu composición...' : 'Generar Composición'}
          </button>
        </form>
      )}

      <section className="mt-12 bg-blue-50 border border-blue-200 p-8 rounded-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">¿Cómo funciona?</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex gap-3">
            <span className="font-bold text-primary">1.</span>
            <span>
              <strong>Selecciona tus emociones</strong> - Identifica las emociones que estás experimentando.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-primary">2.</span>
            <span>
              <strong>Comparte (opcional)</strong> - Escribe tu desahogo para mayor personalización.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-primary">3.</span>
            <span>
              <strong>Recibe tu creación</strong> - La IA generará un poema o canción basado en tus emociones.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-primary">4.</span>
            <span>
              <strong>Procesa tu sentir</strong> - Visualiza y reflexiona sobre tu composición.
            </span>
          </li>
        </ul>
        <p className="mt-6 text-sm text-gray-600 border-t border-blue-300 pt-6">
          <strong>Privacidad:</strong> Tu desahogo no se guarda en nuestros servidores por defecto.
          Puedes revisar nuestra política de privacidad para más detalles.
        </p>
      </section>
    </div>
  )
}
