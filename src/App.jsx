import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import LoginScreen from './LoginScreen'
import BookScreen from './BookScreen'
import EditBook from './EditBook'
import Cookies from 'js-cookie'

axios.defaults.baseURL = "http://localhost:3000"

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = Cookies.get('auth')
    if (token != null) {
      axios.defaults.headers.common = { "Authorization" : `bearer ${token}`}
      setIsAuthenticated(true)
    }
  }, [])
  

  const handleLoginSuccess = (token) => {
    Cookies.set('auth', token)
    setIsAuthenticated(true)
  }

  return (
    <>
      {isAuthenticated ? <BookScreen /> : (<LoginScreen onLoginSuccess={handleLoginSuccess}></LoginScreen>)}
    </>
  )
}

export default App