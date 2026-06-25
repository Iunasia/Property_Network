import { createContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const getInitialState = () => {
    const token = localStorage.getItem('token') || null
    let user = null
    if (token) {
      try {
        user = jwtDecode(token)
      } catch {
        localStorage.removeItem('token')
      }
    }
    return { token, user: token ? user : null }
  }

  const initialState = getInitialState()
  const [user, setUser] = useState(initialState.user)
  const [token, setToken] = useState(initialState.token)

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token)
        setUser(decoded)
      } catch {
        setUser(null)
        setToken(null)
        localStorage.removeItem('token')
      }
    } else {
      setUser(null)
    }
  }, [token])

  const login = (newToken) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}