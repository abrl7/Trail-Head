
import { useMemo } from 'react'
import { useTrails } from '../hooks/useTrails.js'
import Ridgeline from '../components/Ridgeline.jsx'
import { ui } from '../utils/ui.js'

const StatsPage = () => {
  const { trails } = useTrails()

  const stats = useMemo(() => {
    const walked = trails.filter((t) => t.walked)
    const sum = (key) =>
      walked.reduce((total, t) => total + (Number(t[key]) || 0), 0)

    return {
      walkedCount: walked.length,
      totalKm: Math.round(sum('distance') * 10) / 10,
      totalClimb: sum('elevation'),
      totalDays: sum('days'),
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
    <div className="flex flex-col gap-6">
      <h1 className={ui.title}>Stats</h1>

      <dl className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {cards.map(([label, value]) => (
          <div key={label} className={`${ui.surface} p-4`}>
            <dt className={ui.label}>{label}</dt>
            <dd className={`${ui.title} ${label === 'Completion' ? '!text-emerald-300' : ''}`}>
              {value}
            </dd>
          </div>
        ))}
      </dl>

      <section className={`${ui.surface} flex flex-col gap-4 overflow-hidden p-4`}>
        <p className={ui.label}>
          {stats.walkedCount} of {trails.length} trails walked
        </p>
        <Ridgeline completion={stats.completion} />
      </section>
    </div>
  )
}

export default StatsPage