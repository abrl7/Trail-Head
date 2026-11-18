import { useState } from 'react'
import { useTrails } from '../hooks/useTrails.js'

const WalkedToggle = ({ trail }) => {
  const { setWalked } = useTrails()
  const [pending, setPending] = useState(false)
  const [failed, setFailed] = useState(false)

  const handleClick = async () => {
    if (pending) return                 // guard instead of `disabled`, which would drop keyboard focus
    setPending(true)
    setFailed(false)
    try {
      await setWalked(trail.trailId, !trail.walked)
    } catch {
      setFailed(true)                   // the provider already rolled the UI back
    } finally {
      setPending(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
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
      {failed && (
        <span role="alert" className="text-sm font-medium text-rose-300">
          Couldn’t save. Try again.
        </span>
      )}
    </>
  )
}
export default WalkedToggle