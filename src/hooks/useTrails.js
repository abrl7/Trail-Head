import { useContext } from 'react'
import { TrailsContext } from '../context/TrailsContext.jsx'

export const useTrails = () => {
  const ctx = useContext(TrailsContext)
  if (ctx === null) {
    throw new Error('useTrails must be used inside a <TrailsProvider>')
  }
  return ctx
}