import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useTrails } from '../hooks/useTrails.js'
import DifficultyBadge from '../components/DifficultyBadge.jsx'
import WalkedToggle from '../components/WalkedToggle.jsx'
import ElevationBar from '../components/ElevationBar.jsx'
import {walkedCardBg} from '../utils/walkedStyle.js'
import { ui } from '../utils/ui.js'

const BackLink = ({ to }) => (
  <Link to={to} className="inline-flex items-center gap-2 rounded-xl py-2 text-base font-medium text-slate-200 hover:text-white hover:underline">
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
    Back to trails
  </Link>
)

const TrailDetailPage = () => {
  const { id } = useParams()
  const{ trails, removeTrail } = useTrails()
  const location = useLocation()
  const navigate = useNavigate()

  // The card stored the filtered list URL in router state, so Back keeps the filters
  const backTo = location.state?.from || '/trails'
  const trail = trails.find((t) => t.trailId === id)

  if (!trail) {
    return (
      <div className="flex flex-col gap-4">
        <BackLink to={backTo} />
        <div className={`${ui.surface} flex flex-col items-start gap-4 p-6`}>
          <h1 className={ui.title}>Trail not found</h1>
          <p className={ui.body}>
            There is no trail with the id “{id}”. It may have been removed.
          </p>
          <Link to="/trails" className={ui.btnPrimary}>See all trails</Link>
        </div>
      </div>
    )
  }

  const handleRemove = () => {
    if (!window.confirm(`Remove “${trail.trailName}”? This can't be undone.`)) return
    removeTrail(trail.trailId)
    navigate(backTo, { replace: true })
  }

  const facts = [
    ['Region', trail.region || '—'],
    ['Season', trail.season || '—'],
    ['Distance', `${trail.distance} km`],
    ['Elevation', `${Number(trail.elevation).toLocaleString()} m`],
    ['Days', trail.days],
    ['Walked', trail.walked ? 'Yes' : 'No'],
  ]

  return (
    <div className="flex flex-col gap-4">
      <BackLink to={backTo} />

      <article className={`flex flex-col gap-6 rounded-2xl border p-4 sm:p-6 ${walkedCardBg(trail.walked)}`}>
        <header className="flex flex-col gap-4">
          <h1 className="wrap-break-word text-2xl font-bold text-slate-50">{trail.trailName}</h1>
          <div className="flex flex-wrap items-center gap-2">
            <DifficultyBadge difficulty={trail.difficulty} />
            <WalkedToggle trail={trail} />
            <button type="button" onClick={handleRemove} className={ui.btnSecondary}>
              Remove trail
            </button>
          </div>
        </header>

        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {facts.map(([label, value]) => (
            <div key={label} className="rounded-xl bg-slate-800 p-4">
              <dt className={ui.label}>{label}</dt>
              <dd className="mt-1 text-base font-semibold text-slate-100">{value}</dd>
            </div>
          ))}
        </dl>

        <ElevationBar elevation={trail.elevation} />

        <section aria-labelledby="note-heading" className="flex flex-col gap-2">
          <h2 id="note-heading" className={ui.label}>Note</h2>
          <p className="whitespace-pre-wrap wrap-break-word text-base text-slate-200">
            {trail.note || 'No notes added.'}
          </p>
        </section>
      </article>
    </div>
  )
}

export default TrailDetailPage