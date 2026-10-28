import { useMemo } from 'react'
import { useTrails } from '../hooks/useTrails.js'
import Ridgeline from '../components/Ridgeline.jsx'

const StatsPage = () => {
  const { trails } = useTrails()

  const stats = useMemo(() => {
    const walked = trails.filter((t) => t.walked)

    // Coerce in case a value is a string or "" so we never concatenate or get NaN
    const sum = (key) =>
      walked.reduce((total, t) => total + (Number(t[key]) || 0), 0)

    return {
      walkedCount: walked.length,
      totalKm: Math.round(sum('distance') * 10) / 10,
      totalClimb: sum('elevation'),
      totalDays: sum('days'),
      // Guard the empty list: 0 / 0 would be NaN
      completion: trails.length === 0 ? 0 : (walked.length / trails.length) * 100,
    }
  }, [trails])

  const cards = [
    ['Trails walked', stats.walkedCount],
    ['Total distance', `${stats.totalKm} km`],
    ['Total climbed', `${stats.totalClimb.toLocaleString()} m`],
    ['Days on trail', stats.totalDays],
    ['Completion', `${Math.round(stats.completion)}%`],
  ]

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Stats</h1>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {cards.map(([label, value]) => (
          <div key={label} className="bg-blue-50 rounded-2xl p-4 shadow-md">
            <p className="text-sm font-bold text-gray-600">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      <p className="text-sm font-bold text-gray-600 mb-2">
        {stats.walkedCount} of {trails.length} trails walked
      </p>

      <Ridgeline completion={stats.completion} />
    </div>
  )
}

export default StatsPage