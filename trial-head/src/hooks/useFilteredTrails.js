
import { useMemo } from 'react'
import { useTrails } from './useTrails.js'
import { useUrlParam } from './useUrlParam.js'

export const useFilteredTrails = () => {
  const { trails } = useTrails()
  const [q] = useUrlParam('q')
  const [region] = useUrlParam('region', 'All')
  const [difficulty] = useUrlParam('difficulty', 'All')

  return useMemo(() => {
    const search = q.toLowerCase()
    return trails.filter((t) => {
      const matchesSearch =
        t.trailName.toLowerCase().includes(search) ||
        t.region.toLowerCase().includes(search)
      const matchesRegion = region === 'All' || t.region === region
      const matchesDifficulty = difficulty === 'All' || t.difficulty === difficulty
      return matchesSearch && matchesRegion && matchesDifficulty
    })
  }, [trails, q, region, difficulty])
}