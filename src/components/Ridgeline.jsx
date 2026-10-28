const RIDGE_W = 1200
const RIDGE_H = 200

// One closed shape: peaks along the top, flat along the bottom
const RIDGE_PATH =
  'M0 200 L0 140 L90 90 L160 120 L260 40 L340 110 L420 70 L520 150 ' +
  'L610 60 L690 100 L780 20 L860 95 L950 55 L1050 125 L1130 85 L1200 110 L1200 200 Z'

const Ridgeline = ({ completion }) => {
  // Clamp so a bad value can never draw outside the viewBox
  const pct = Math.min(Math.max(completion, 0), 100)

  return (
    <svg
      viewBox={`0 0 ${RIDGE_W} ${RIDGE_H}`}
      preserveAspectRatio="none"
      className="w-full h-40"
      role="img"
      aria-label={`Ridgeline progress: ${Math.round(pct)}% of trails walked`}
    >
      <defs>
        <clipPath id="ridge-progress">
          <rect x="0" y="0" width={(pct / 100) * RIDGE_W} height={RIDGE_H} />
        </clipPath>
      </defs>

      {/* 1. Muted full ridgeline */}
      <path d={RIDGE_PATH} className="fill-slate-200" />

      {/* 2. Same path, accent colour, clipped to the completion width */}
      <path d={RIDGE_PATH} className="fill-green-600" clipPath="url(#ridge-progress)" />
    </svg>
  )
}

export default Ridgeline