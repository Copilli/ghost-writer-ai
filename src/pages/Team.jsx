import alegriaImg from '../assets/Alegria.png'
import amorImg from '../assets/Amor.png'
import soledadImg from '../assets/Soledad.png'
import esperanzaImg from '../assets/Esperanza.png'
import privacidadImg from '../assets/privacidad.png'
import empatiaImg from '../assets/empatia.png'
import responsabilidadImg from '../assets/responsabilidad.png'
import innovacionImg from '../assets/innovacion.png'
import amahiaImg from '../assets/Amahia.jpg'
import naomiImg from '../assets/Naomi.jpg'

export default function Team() {
  const teamMembers = [
    {
      id: 1,
      name: "Zyanya Ramirez",
      role: "Diseñadora UX/UI",
      bio: "Especialista en experiencia de usuario con 5 años en diseño de aplicaciones de bienestar mental.",
      image: naomiImg,
      email: "zyanya.ramirez@copilli.edu.mx",
    },
    {
      id: 2,
      name: "Amahia Gomez",
      role: "Desarrollador Full Stack",
      bio: "Ingeniero de software apasionado por crear soluciones tecnológicas que impacten positivamente la salud mental.",
      image: amahiaImg,
      email: "amahia.gomez@copilli.edu.mx",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Sobre Nosotros
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Ghost Writer AI es un proyecto creado por un equipo apasionado en la intersección de tecnología, 
          diseño y bienestar mental. Nuestro objetivo es democratizar el acceso a herramientas terapéuticas 
          innovadoras usando inteligencia artificial de forma ética y responsable.
        </p>
      </section>

      {/* Mission Section */}
      <section className="mb-16 bg-indigo-50 p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Misión</h2>
        <p className="text-lg text-gray-700 mb-4">
          Crear un espacio seguro donde cada persona pueda expresar sus emociones complejas y procesarlas 
          de forma creativa mediante la inteligencia artificial, promoviendo la salud mental y el bienestar emocional.
        </p>
        <p className="text-lg text-gray-700">
          Creemos que la tecnología debe ser un puente hacia la introspección, no un reemplazo de la atención 
          profesional. Ghost Writer AI es un complemento para el bienestar, con énfasis en la privacidad, 
          seguridad y consentimiento informado.
        </p>
      </section>

      {/* Team Members */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
          Nuestro Equipo
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:scale-105"
            >
              {/* Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-primary to-secondary flex items-center justify-center overflow-hidden">
                <img
                  src={member.image}
                  alt={`${member.name} foto`}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-primary font-bold text-lg mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 mb-6">
                  {member.bio}
                </p>
                <a
                  href={`mailto:${member.email}`}
                  className="inline-block text-primary font-bold hover:text-secondary transition"
                >
                  {member.email} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-100 p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Nuestros Valores
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <img
              src={privacidadImg}
              alt="Privacidad"
              className="mx-auto h-20 w-20 rounded-full object-cover mb-4"
            />
            <h4 className="font-bold text-gray-900 mb-2">Privacidad</h4>
            <p className="text-gray-600">
              Tu información y emociones son privadas y seguras.
            </p>
          </div>
          <div className="text-center">
            <img
              src={empatiaImg}
              alt="Empatía"
              className="mx-auto h-20 w-20 rounded-full object-cover mb-4"
            />
            <h4 className="font-bold text-gray-900 mb-2">Empatía</h4>
            <p className="text-gray-600">
              Entendemos el valor de procesar emociones.
            </p>
          </div>
          <div className="text-center">
            <img
              src={responsabilidadImg}
              alt="Responsabilidad"
              className="mx-auto h-20 w-20 rounded-full object-cover mb-4"
            />
            <h4 className="font-bold text-gray-900 mb-2">Responsabilidad</h4>
            <p className="text-gray-600">
              IA ética que respeta la dignidad humana.
            </p>
          </div>
          <div className="text-center">
            <img
              src={innovacionImg}
              alt="Innovación"
              className="mx-auto h-20 w-20 rounded-full object-cover mb-4"
            />
            <h4 className="font-bold text-gray-900 mb-2">Innovación</h4>
            <p className="text-gray-600">
              Tecnología al servicio del bienestar.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
