import react from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import List from './pages/List'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import './styles/global.css'

function App() {

  const Logout = () => {
  localStorage.clear()
  return <Navigate to='/login' />
}

const RegisterLogout = () => {
  localStorage.clear()
  return <Register />
}



  return (
      <BrowserRouter>
      <Navbar />
          <Routes>
            <Route path ='/' element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/logout' element={<Logout />}></Route>
            <Route path='register' element={<RegisterLogout />}></Route>
            <Route path ='/list' element={<ProtectedRoute><List /></ProtectedRoute>}></Route>
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
  )
}

export default App
