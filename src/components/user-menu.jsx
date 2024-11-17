import { useState, useCallback } from 'react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

export default function UserMenu({ onClose, onLeave }) {
  const [isLoginView, setIsLoginView] = useState(true)
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add your authentication logic here
    console.log('Form submitted:', formData)
  }

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-6 z-50" onMouseLeave={onLeave}>
      {isForgotPassword ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Solicitar código</h2>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="E-mail"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={() => {
                setIsForgotPassword(false)
                setFormData({ email: '', password: '' })
              }}
              className="text-sm font-medium hover:underline"
            >
              ← Volver
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Enviar
            </button>
          </div>
        </form>
      ) : isLoginView ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Ingresar</h2>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="E-mail"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2.5 text-gray-500"
            >
              {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
          <button
            type="button"
            onClick={() => setIsForgotPassword(true)}
            className="text-sm text-gray-600 hover:underline"
          >
            Olvidé mi contraseña
          </button>
          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={onClose}
              className="text-sm font-medium hover:underline"
            >
              ← Volver
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Entrar
            </button>
          </div>
          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              ¿No tiene una cuenta?{" "}
              <button
                type="button"
                onClick={() => setIsLoginView(false)}
                className="text-black font-medium hover:underline"
              >
                Regístrese
              </button>
            </p>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Registrarse</h2>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="E-mail"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2.5 text-gray-500"
            >
              {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={() => setIsLoginView(true)}
              className="text-sm font-medium hover:underline"
            >
              ← Volver
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Registrarse
            </button>
          </div>
        </form>
      )}
    </div>
  )
}