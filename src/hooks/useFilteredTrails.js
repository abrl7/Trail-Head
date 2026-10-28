
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTrails } from './useTrails.js'

export const useFilteredTrails = () => {
  const { trails } = useTrails()
  const [searchParams] = useSearchParams()

  const q = (searchParams.get('q') || '').toLowerCase()
  const region = searchParams.get('region') || 'All'
  const difficulty = searchParams.get('difficulty') || 'All'

  return useMemo(
    () =>
      trails.filter((t) => {
        const matchesSearch =
          t.trailName.toLowerCase().includes(q) || t.region.toLowerCase().includes(q)
        const matchesRegion = region === 'All' || t.region === region
        const matchesDifficulty = difficulty === 'All' || t.difficulty === difficulty
        return matchesSearch && matchesRegion && matchesDifficulty
      }),
    [trails, q, region, difficulty]
  )
}