import { useState } from 'react'

export default function Emotions() {
  const emotions = [
    { id: 'anxiety', label: 'Ansiedad', emoji: '😰', color: 'bg-yellow-100 border-yellow-400' },
    { id: 'sadness', label: 'Tristeza', emoji: '😢', color: 'bg-blue-100 border-blue-400' },
    { id: 'anger', label: 'Ira', emoji: '😠', color: 'bg-red-100 border-red-400' },
    { id: 'joy', label: 'Alegría', emoji: '😊', color: 'bg-green-100 border-green-400' },
    { id: 'fear', label: 'Miedo', emoji: '😨', color: 'bg-purple-100 border-purple-400' },
    { id: 'love', label: 'Amor', emoji: '💓', color: 'bg-pink-100 border-pink-400' },
    { id: 'confusion', label: 'Confusión', emoji: '😕', color: 'bg-orange-100 border-orange-400' },
    { id: 'loneliness', label: 'Soledad', emoji: '😔', color: 'bg-indigo-100 border-indigo-400' },
    { id: 'overwhelm', label: 'Abrumamiento', emoji: '😫', color: 'bg-cyan-100 border-cyan-400' },
    { id: 'hope', label: 'Esperanza', emoji: '🌟', color: 'bg-yellow-50 border-yellow-300' },
  ]

  const [selectedEmotions, setSelectedEmotions] = useState([])
  const [text, setText] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const [submitted, setSubmitted] = useState(false)

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

    // Count words
    const words = newText.trim().split(/\s+/).filter((word) => word.length > 0)
    setWordCount(words.length)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (selectedEmotions.length === 0) {
      alert('Por favor selecciona al menos una emoción.')
      return
    }

    // Here we would send the data to the backend for processing
    console.log({
      emotions: selectedEmotions,
      text,
      wordCount,
      timestamp: new Date().toISOString(),
    })

    setSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setSelectedEmotions([])
      setText('')
      setWordCount(0)
      setSubmitted(false)
    }, 3000)
  }

  const selectedEmotionsLabels = selectedEmotions
    .map((id) => emotions.find((e) => e.id === id)?.label)
    .filter(Boolean)

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Expresa tu Emoción
        </h1>
        <p className="text-xl text-gray-600">
          Selecciona las emociones que sientes y comparte tu desahogo. 
          Transformaremos tus palabras en una composición poética.
        </p>
      </section>

      {/* Submitted Success Message */}
      {submitted && (
        <div className="mb-8 p-6 bg-green-100 border border-green-400 text-green-800 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-2">✨ ¡Tu desahogo ha sido registrado!</h3>
          <p className="text-lg">
            Tu composición IA se está generando. Pronto podrás ver el resultado.
          </p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
        {/* Emotions Selection */}
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
                className={`p-4 rounded-lg border-2 transition transform hover:scale-105 ${
                  selectedEmotions.includes(emotion.id)
                    ? `${emotion.color} ring-2 ring-offset-2 ring-primary`
                    : 'bg-gray-50 border-gray-300 hover:border-primary'
                }`}
              >
                <div className="text-4xl mb-2">{emotion.emoji}</div>
                <div className="text-sm font-bold text-gray-900">
                  {emotion.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Text Area */}
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

        {/* Selected Emotions Summary */}
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={selectedEmotions.length === 0 || submitted}
          className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition transform hover:scale-105 ${
            selectedEmotions.length === 0 || submitted
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg'
          }`}
        >
          {submitted ? '⏳ Procesando...' : '✨ Generar Composición'}
        </button>
      </form>

      {/* Info Box */}
      <section className="mt-12 bg-blue-50 border border-blue-200 p-8 rounded-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">💡 ¿Cómo funciona?</h3>
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
              <strong>Comparte (opcional)</strong> - Escribe tu desahogo para mayor personalizacion.
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
          <strong>🔒 Privacidad:</strong> Tu desahogo no se guarda en nuestros servidores por defecto. 
          Puedes revisar nuestra política de privacidad para más detalles.
        </p>
      </section>
    </div>
  )
}
