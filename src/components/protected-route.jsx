import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('adminAuth') === 'true'

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}