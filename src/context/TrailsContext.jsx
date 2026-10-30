import { createContext, useState, useCallback, useMemo } from 'react'
import seedTrails from '../data/trails.json'   

// Named export: only the hook file imports this. Components never do.
export const TrailsContext = createContext(null)

const nextTrailId = (trails) => {
  const max = trails.reduce(
    (m, t) => Math.max(m, parseInt(t.trailId.split('-')[1], 10)),
    0
  )
  return `tr-${String(max + 1).padStart(3, '0')}`
}

export const TrailsProvider = ({ children }) => {
  const [trails, setTrails] = useState(seedTrails)

  const toggleWalked = useCallback((trailId) => {
    setTrails((prev) =>
      prev.map((t) => (t.trailId === trailId ? { ...t, walked: !t.walked } : t))
    )
  }, [])

  const removeTrail = useCallback((trailId) => {
    setTrails((prev) => prev.filter((t) => t.trailId !== trailId))
  }, [])

  // Returns the new trail so the form can navigate to /trails/<newId>
  const addTrail = useCallback(
    (data) => {
      const newTrail = { ...data, trailId: nextTrailId(trails) }
      setTrails((prev) => [...prev, newTrail])
      return newTrail
    },
    [trails]
  )

  const value = useMemo(
    () => ({ trails, addTrail, removeTrail, toggleWalked }),
    [trails, addTrail, removeTrail, toggleWalked]
  )

  return <TrailsContext.Provider value={value}>{children}</TrailsContext.Provider>
}