import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AdminLogin from './AdminLogin'
import AdminLayout from './AdminLayout'
import ProtectedRoute from './protected-route'
import ProductForm from './ProductForm'
import ProductList from './ProductList'

const Dashboard = () => <h1 className="text-2xl font-bold">Dashboard</h1>
const Categories = () => <h1 className="text-2xl font-bold">Categorías</h1>

export default function AdminRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth') === 'true'
    setIsAuthenticated(auth)
  }, [])

  return (
    <Routes>
      <Route
        path="/admin/login"
        element={
          isAuthenticated ? (
            <Navigate to="/admin" replace />
          ) : (
            <AdminLogin onLogin={() => setIsAuthenticated(true)} />
          )
        }
      />
      
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/productos" element={<ProductList />} />
                <Route path="/productos/nuevo" element={<ProductForm />} />
                <Route path="/productos/categorias" element={<Categories />} />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}