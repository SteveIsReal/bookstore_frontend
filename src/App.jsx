import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import LoginScreen from './LoginScreen'
import BookScreen from './BookScreen'
import EditBook from './EditBook'
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import Settings from './Settings'

axios.defaults.baseURL = "http://localhost:3000"

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  // useEffect(() => {
  //   const token = Cookies.get('auth')
  //   if (token != null) {
  //     axios.defaults.headers.common = { "Authorization" : `bearer ${token}`}
  //     setIsAuthenticated(true)
  //   }
  // }, [])

  const ProtectRoute = ({children}) => {
    const token = Cookies.get('auth')
    if (!token){
      return <Navigate to='/login' replace />
    }
    axios.defaults.headers.common = {'Authorization' : `bearer ${token}`}

    return children
  }
  

  const handleLoginSuccess = (token) => {
    Cookies.set('auth', token)
    setIsAuthenticated(true)
    navigate('/book')

  }

  return (
    <>
      <Routes>
        <Route path="/book" element={
          <ProtectRoute>
            <BookScreen isAuthenticated={isAuthenticated} />
          </ProtectRoute>
          }></Route>
        <Route path="/login" element={<LoginScreen onLoginSuccess={handleLoginSuccess} />}></Route>
        <Route path="/settings" element={
          <ProtectRoute>
          <Settings></Settings>
          </ProtectRoute>
        }></Route>
        <Route path="*" element={
          <div>
            <h1>Not found</h1>
            <Link to={'/book'}>Home</Link>
          </div>
          }/>
      </Routes>

    </>
  )
}

export default App