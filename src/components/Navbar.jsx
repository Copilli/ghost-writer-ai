import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">✨ Ghost Writer AI</span>
        </Link>
        <ul className="flex gap-6">
          <li>
            <Link to="/" className="text-gray-700 hover:text-primary font-medium transition">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/emotions" className="text-gray-700 hover:text-primary font-medium transition">
              Emociones
            </Link>
          </li>
          <li>
            <Link to="/team" className="text-gray-700 hover:text-primary font-medium transition">
              Sobre Nosotros
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
