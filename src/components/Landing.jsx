import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ShoppingBagIcon, HeartIcon, UserIcon, MagnifyingGlassIcon, XMarkIcon, TrashIcon } from '@heroicons/react/24/outline'
import UserMenu from './user-menu'
import Checkout from './Checkout'
import Confirmation from './Confirmation'
import axios from 'axios'

export default function App() {
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/products')
      .then(res => {
        setProducts(res.data.data) // El servidor devuelve los datos en un objeto con la estructura {success: true, data: [...]}
      })
  }, [])

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId)
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      )
    }
  }

  return (
    <Router>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="border-b">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link to="/" className="flex items-center">
                <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16v16H4z M4 12h16" />
                </svg>
                <span className="ml-2 text-xl font-bold">Kyoto Store</span>
              </Link>

              {/* Navigation */}
              <nav className="hidden md:flex space-x-8">
                <Link to="/calzado" className="text-gray-600 hover:text-gray-900">CALZADO</Link>
                <Link to="/mujer" className="text-gray-600 hover:text-gray-900">MUJER</Link>
                <Link to="/hombre" className="text-gray-600 hover:text-gray-900">HOMBRE</Link>
                <Link to="/ninos" className="text-gray-600 hover:text-gray-900">NIÑOS</Link>
                <Link to="/deporte" className="text-gray-600 hover:text-gray-900">DEPORTE</Link>
              </nav>

              {/* Icons */}
              <div className="flex items-center space-x-4">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <MagnifyingGlassIcon className="h-6 w-6" />
                </button>
                <div className="relative">
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  >
                    <UserIcon className="h-6 w-6" />
                  </button>
                  {isUserMenuOpen && <UserMenu onClose={() => setIsUserMenuOpen(false)} />}
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <HeartIcon className="h-6 w-6" />
                </button>
                <button 
                  className="p-2 hover:bg-gray-100 rounded-full relative"
                  onClick={() => setIsCartOpen(!isCartOpen)}
                >
                  <ShoppingBagIcon className="h-6 w-6" />
                  {cartItems.length > 0 && (
                    <span className="absolute top-0 right-0 h-5 w-5 bg-black text-white rounded-full text-xs flex items-center justify-center">
                      {cartItems.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        <Routes>
          <Route path="/" element={
            <>
              {/* Hero Section */}
              <section className="relative">
                <div className="max-w-7xl mx-auto px-4 py-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                      <h1 className="text-4xl font-bold">Bienvenidos a Kyoto Store</h1>
                      <p className="text-gray-600">Descubre nuestra nueva colección inspirada en la cultura japonesa</p>
                      <Link
                        to="/productos"
                        className="inline-block bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800"
                      >
                        Comprar Ahora
                      </Link>
                    </div>
                    <div className="aspect-w-16 aspect-h-9">
                      <img
                        src="https://images.pexels.com/photos/26575474/pexels-photo-26575474/free-photo-of-mujer-calle-modelo-maqueta.jpeg"
                        alt="Hero"
                        className="object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Products Grid */}
              <section className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex space-x-4 mb-8">
                  <button className="px-4 py-2 bg-black text-white rounded-full">Novedades</button>
                  <button className="px-4 py-2 border rounded-full hover:bg-gray-100">Exclusivo miembros</button>
                  <button className="px-4 py-2 border rounded-full hover:bg-gray-100">Colecciones</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {products.map((product) => (
                    <div key={product.id} className="group relative">
                      <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover object-center"
                        />
                        <button className="absolute top-4 right-4 p-2 rounded-full bg-white hover:bg-gray-100">
                          <HeartIcon className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="mt-4 space-y-2">
                        <h3 className="text-sm font-medium">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.category}</p>
                        <p className="text-lg font-bold">${product.price}</p>
                        <button
                          onClick={() => addToCart(product)}
                          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
                        >
                          Añadir al carrito
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          } />
          <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
          <Route path="/confirmation" element={<Confirmation />} />
          </Routes>

        {/* Shopping Cart Sidebar */}
        {isCartOpen && (
          <div className="fixed inset-0 overflow-hidden z-50">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsCartOpen(false)} />
              <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                <div className="w-screen max-w-md">
                  <div className="h-full flex flex-col bg-white shadow-xl">
                    <div className="flex-1 py-6 overflow-y-auto px-4">
                      <div className="flex items-start justify-between">
                        <h2 className="text-lg font-medium text-gray-900">Carrito de compras</h2>
                        <button
                          className="ml-3 h-7 w-7 text-gray-400 hover:text-gray-500"
                          onClick={() => setIsCartOpen(false)}
                        >
                          <XMarkIcon className="h-6 w-6" />
                        </button>
                      </div>

                      <div className="mt-8">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>{item.name}</h3>
                                  <p className="ml-4">${item.price}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                              </div>
                              <div className="flex-1 flex items-end justify-between text-sm">
                                <div className="flex items-center">
                                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="font-medium text-indigo-600 hover:text-indigo-500">-</button>
                                  <p className="text-gray-500 mx-2">Cantidad {item.quantity}</p>
                                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="font-medium text-indigo-600 hover:text-indigo-500">+</button>
                                </div>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  <TrashIcon className="h-5 w-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Envío calculado al finalizar la compra.</p>
                      <div className="mt-6">
                      <Link
                        to={cartItems.length > 0 ? "/checkout" : "#"}
                        onClick={(e) => {
                          if (cartItems.length === 0) {
                            e.preventDefault(); // Evita la navegación si el carrito está vacío
                          } else {
                            setIsCartOpen(false);
                          }
                        }}
                        className={`flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium ${
                          cartItems.length > 0
                            ? "text-white bg-black hover:bg-gray-800" // Activo
                            : "text-gray-500 bg-gray-300 cursor-not-allowed" // Deshabilitado
                        }`}
                      >
                        Finalizar Compra
                      </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Router>
  )
}