// src/context/TrailsContext.jsx
import { createContext, useState, useEffect, useCallback, useMemo } from 'react'
import { api } from '../api/client.js'

export const TrailsContext = createContext(null)

export const TrailsProvider = ({ children }) => {
  const [trails, setTrails] = useState([])
  const [status, setStatus] = useState('loading')   // 'loading' | 'ready' | 'error'
  const [error, setError] = useState(null)

  const fetchTrails = useCallback(async (signal) => {
    try {
      const data = await api.get('/trails', { signal })
      setTrails(data)
      setError(null)
      setStatus('ready')
    } catch (err) {
      if (err.name === 'AbortError') return          // cancelled on purpose, not a failure
      setError(err.message)
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    fetchTrails(controller.signal)
    return () => controller.abort()                   // cleanup if the provider unmounts
  }, [fetchTrails])

  const reload = useCallback(() => {
    setStatus('loading')
    return fetchTrails()
  }, [fetchTrails])

  // Waits for the server: we need its generated ID before we can show the trail
  const addTrail = useCallback(async (data) => {
    const created = await api.post('/trails', data)
    setTrails((prev) => [...prev, created])
    return created
  }, [])

  const removeTrail = useCallback(async (trailId) => {
    await api.delete(`/trails/${trailId}`)
    setTrails((prev) => prev.filter((t) => t.trailId !== trailId))
  }, [])

  // Updates the screen immediately, then confirms with the server
  const setWalked = useCallback(async (trailId, walked) => {
    const apply = (value) =>
      setTrails((prev) =>
        prev.map((t) => (t.trailId === trailId ? { ...t, walked: value } : t))
      )

    apply(walked)                                     // optimistic
    try {
      await api.patch(`/trails/${trailId}`, { walked })
    } catch (err) {
      apply(!walked)                                  // roll back
      throw err
    }
  }, [])

  const value = useMemo(
    () => ({ trails, status, error, reload, addTrail, removeTrail, setWalked }),
    [trails, status, error, reload, addTrail, removeTrail, setWalked]
  )

  return <TrailsContext.Provider value={value}>{children}</TrailsContext.Provider>
}