
import { useTrails } from '../hooks/useTrails.js'

const WalkedToggle = ({ trail }) => {
  const { toggleWalked } = useTrails()

  return (
    <button
      type="button"
      onClick={() => toggleWalked(trail.trailId)}
      aria-pressed={trail.walked}
      aria-label={`Walked, ${trail.trailName}`}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${
        trail.walked
          ? 'border-emerald-400 bg-emerald-500/15 text-emerald-300'
          : 'border-slate-600 text-slate-200 hover:bg-slate-800'
      }`}
    >
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        {trail.walked && <polyline points="8 12.5 11 15.5 16 9" />}
      </svg>
      Walked
    </button>
  )
}
export default WalkedToggle