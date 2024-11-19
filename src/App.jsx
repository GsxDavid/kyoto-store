import { Route, Routes } from 'react-router-dom'
import './App.css'
import Landing from './components/Landing'
import AdminRoutes from './components/admin-routes'

function App() {

  return (
    <>
      <AdminRoutes />
      <Routes>
        <Route path='/*' element={<Landing />} />
        <Route path='/admin/*' element={<AdminRoutes />} />
      </Routes>
    </>
  )
}

export default App
