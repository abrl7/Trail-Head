const RIDGE_W = 1200
const RIDGE_H = 200

// One closed shape: peaks along the top, flat along the bottom
const RIDGE_PATH =
  'M0 200 L0 140 L90 90 L160 120 L260 40 L340 110 L420 70 L520 150 ' +
  'L610 60 L690 100 L780 20 L860 95 L950 55 L1050 125 L1130 85 L1200 110 L1200 200 Z'

const StatsPage = ({ trails }) => {
  const walkedTrails = trails.filter((t) => t.walked)

  // Form inputs are strings, and may be "" — coerce so we never sum "12" + "5" = "125" or get NaN
  const sum = (key) =>
    walkedTrails.reduce((total, t) => total + (Number(t[key]) || 0), 0)

  const walkedCount = walkedTrails.length
  const totalKm = Math.round(sum('distance') * 10) / 10
  const totalClimb = sum('elevation')
  const totalDays = sum('days')

  // Guard the empty list: 0 / 0 would be NaN
  const completion = trails.length === 0 ? 0 : (walkedCount / trails.length) * 100

  const stats = [
    ['Trails walked', walkedCount],
    ['Total distance', `${totalKm} km`],
    ['Total climbed', `${totalClimb.toLocaleString()} m`],
    ['Days on trail', totalDays],
    ['Completion', `${Math.round(completion)}%`],
  ]

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Stats</h1>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {stats.map(([label, value]) => (
          <div key={label} className="bg-blue-50 rounded-2xl p-4 shadow-md">
            <p className="text-sm font-bold text-gray-600">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      <p className="text-sm font-bold text-gray-600 mb-2">
        {walkedCount} of {trails.length} trails walked
      </p>

      <svg
        viewBox={`0 0 ${RIDGE_W} ${RIDGE_H}`}
        preserveAspectRatio="none"
        className="w-full h-40"
        role="img"
        aria-label={`Ridgeline progress: ${Math.round(completion)}% of trails walked`}
      >
        <defs>
          <clipPath id="ridge-progress">
            <rect x="0" y="0" width={(completion / 100) * RIDGE_W} height={RIDGE_H} />
          </clipPath>
        </defs>

        {/* 1. Muted full ridgeline */}
        <path d={RIDGE_PATH} className="fill-slate-200" />

        {/* 2. Same path, accent colour, clipped to the completion width */}
        <path d={RIDGE_PATH} className="fill-green-600" clipPath="url(#ridge-progress)" />
      </svg>
    </div>
  )
}

export default StatsPage