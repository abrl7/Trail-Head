const STYLES = {
  Easy: 'border-sky-800 bg-sky-950 text-sky-300',
  Moderate: 'border-amber-800 bg-amber-950 text-amber-300',
  Hard: 'border-rose-800 bg-rose-950 text-rose-300',
}

const DifficultyBadge = ({ difficulty }) => {
  if (!difficulty) return null
  return (
    <span
      className={`inline-flex items-center rounded-xl border px-2 py-1 text-sm font-medium ${
        STYLES[difficulty] || 'border-slate-700 bg-slate-800 text-slate-300'
      }`}
    >
      {difficulty}
    </span>
  )
}
export default DifficultyBadge