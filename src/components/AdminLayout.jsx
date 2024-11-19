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

  const toggleSubmenu = (title) => {
    setOpenMenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }))
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    navigate('/admin/login')
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white z-50 px-4 py-2 flex items-center justify-between border-b">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
        >
          {isSidebarOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars4Icon className="h-6 w-6" />
          )}
        </button>
        <span className="font-semibold text-lg">Admin Panel</span>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:inset-auto lg:w-64 border-r`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-16 flex items-center justify-center border-b">
            <Link to="/admin" className="text-xl font-bold">
              Kyoto Admin
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            {menuItems.map((item) => (
              <div key={item.title}>
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.title)}
                      className={`w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900`}
                    >
                      <div className="flex items-center">
                        {item.icon}
                        <span className="ml-3">{item.title}</span>
                      </div>
                      <ChevronDownIcon
                        className={`ml-2 h-4 w-4 transform transition-transform duration-200 ${
                          openMenus[item.title] ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openMenus[item.title] && (
                      <div className="bg-gray-50">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className={`block pl-12 pr-4 py-2 text-sm font-medium ${
                              isActive(subItem.path)
                                ? 'text-black bg-gray-100'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
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
                    className={`flex items-center px-4 py-2 text-sm font-medium ${
                      isActive(item.path)
                        ? 'text-black bg-gray-100'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
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
              className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
            >
{/*               <LogoutIcon className="h-5 w-5" />
 */}              <span className="ml-3">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`lg:pl-64 flex flex-col min-h-screen`}>
        <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8 mt-14 lg:mt-0">
          {children}
        </main>
      </div>
    </div>
  )
}