import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('thisutech_user')
    return saved ? JSON.parse(saved) : null
  })
  const [token, setToken] = useState(() =>
    localStorage.getItem('thisutech_token') || null
  )

  const login = (userData, accessToken) => {
    setUser(userData)
    setToken(accessToken)
    localStorage.setItem('thisutech_user', JSON.stringify(userData))
    localStorage.setItem('thisutech_token', accessToken)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('thisutech_user')
    localStorage.removeItem('thisutech_token')
  }

  const isAuthenticated = Boolean(token && user)

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
