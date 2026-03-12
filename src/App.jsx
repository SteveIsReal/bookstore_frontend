import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import LoginScreen from './LoginScreen'
import BookScreen from './BookScreen'
import EditBook from './EditBook'
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

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
    navigate('/')

  }

  return (
    <>
      <Routes>
        <Route path="/" element={
          <ProtectRoute>
            <BookScreen isAuthenticated={isAuthenticated} />
          </ProtectRoute>
          }></Route>
        <Route path="/login" element={<LoginScreen onLoginSuccess={handleLoginSuccess} />}></Route>
        <Route path="*" element={
          <div>
            <h1>Not found</h1>
            <Link to={'/'}>Home</Link>
          </div>
          }/>
      </Routes>

    </>
  )
}

export default App