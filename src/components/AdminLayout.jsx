import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  ChevronDownIcon,
  HomeIcon,
  ShoppingBagIcon,
  UsersIcon,
  CogIcon,
  ChartBarIcon,
  Bars4Icon,
  XMarkIcon,
  ArrowLeftEndOnRectangleIcon
} from '@heroicons/react/24/outline'

const menuItems = [
  {
    title: 'Dashboard',
    icon: <HomeIcon className="h-5 w-5" />,
    path: '/admin'
  },
  {
    title: 'Productos',
    icon: <ShoppingBagIcon className="h-5 w-5" />,
    submenu: [
      { title: 'Lista de Productos', path: '/admin/productos' },
      { title: 'Añadir Producto', path: '/admin/productos/nuevo' },
      { title: 'Categorías', path: '/admin/productos/categorias' }
    ]
  },
  {
    title: 'Usuarios',
    icon: <UsersIcon className="h-5 w-5" />,
    submenu: [
      { title: 'Lista de Usuarios', path: '/admin/usuarios' },
      { title: 'Roles', path: '/admin/usuarios/roles' }
    ]
  },
  {
    title: 'Ventas',
    icon: <ChartBarIcon className="h-5 w-5" />,
    submenu: [
      { title: 'Órdenes', path: '/admin/ventas/ordenes' },
      { title: 'Reportes', path: '/admin/ventas/reportes' }
    ]
  },
  {
    title: 'Configuración',
    icon: <CogIcon className="h-5 w-5" />,
    path: '/admin/configuracion'
  }
]

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [openMenus, setOpenMenus] = useState({})
  const location = useLocation()
  const navigate = useNavigate()

  const toggleSubmenu = title => {
    setOpenMenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }))
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    navigate('/admin/login')
  }

  const isActive = path => {
    return location.pathname === path
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b bg-white px-4 lg:hidden">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600"
          aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {isSidebarOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars4Icon className="h-6 w-6" />
          )}
        </button>
        <span className="text-lg font-semibold">Admin Panel</span>
        <div className="w-10" aria-hidden="true" />
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform overflow-y-auto bg-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-center border-b px-4">
            <Link to="/admin" className="text-xl font-bold">
              Kyoto Admin
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2 py-4">
            {menuItems.map(item => (
              <div key={item.title}>
                {item.submenu ? (
                  <div className="space-y-1">
                    <button
                      onClick={() => toggleSubmenu(item.title)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                    >
                      <div className="flex items-center">
                        {item.icon}
                        <span className="ml-3">{item.title}</span>
                      </div>
                      <ChevronDownIcon
                        className={`h-4 w-4 transform transition-transform duration-200 ${
                          openMenus[item.title] ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openMenus[item.title] && (
                      <div className="space-y-1 pl-10">
                        {item.submenu.map(subItem => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                              isActive(subItem.path)
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.title}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* User section */}
          <div className="border-t p-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
            >
              <ArrowLeftEndOnRectangleIcon className="h-5 w-5" />
              <span className="ml-3">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        <div className="min-h-screen px-4 py-6 pt-20 lg:px-8 lg:pt-6">
          {children}
        </div>
      </main>
    </div>
  )
}
