// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useCallback, useMemo } from 'react'
import { api, setUnauthorizedHandler } from '../api/client.js'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState('loading')   // 'loading' | 'anonymous' | 'authenticated'

  const clear = useCallback(() => {
    setUser(null)
    setStatus('anonymous')
  }, [])

  // On startup, ask the server who we are
  useEffect(() => {
    const controller = new AbortController()
    api
      .get('/auth/me', { signal: controller.signal })
      .then((u) => {
        setUser(u)
        setStatus('authenticated')
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        clear()   // simplification: a network failure also lands here
      })
    return () => controller.abort()
  }, [clear])

  // If any later request gets a 401, the session died: drop the user
  useEffect(() => {
    setUnauthorizedHandler(clear)
    return () => setUnauthorizedHandler(null)
  }, [clear])

  const login = useCallback(async (email, password) => {
    const u = await api.post('/auth/login', { email, password })
    setUser(u)
    setStatus('authenticated')
    return u
  }, [])

  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout')
    } finally {
      clear()   // clear locally even if the request failed
    }
  }, [clear])

  const value = useMemo(
    () => ({ user, status, isAdmin: user?.role === 'admin', login, logout }),
    [user, status, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}