import { Link, useLocation } from 'react-router-dom'
import DifficultyBadge from './DifficultyBadge.jsx'
import WalkedToggle from './WalkedToggle.jsx'
import ElevationBar from './ElevationBar.jsx'
import { walkedCardBg } from '../utils/walkedStyle.js'

const TrailCard = ({ trail }) => {
  const location = useLocation()
  const from = location.pathname + location.search

  const facts = [
    ['Season', trail.season || '—'],
    ['Distance', `${trail.distance} km`],
    ['Days', trail.days],
  ]

  return (
    <article className={`flex h-full flex-col gap-4 rounded-2xl border p-4 ${walkedCardBg(trail.walked)}`}>
      <header className="flex flex-col gap-2">
        <p className="text-sm font-medium text-slate-400">{trail.region}</p>
        <h2 className="wrap-break-word text-2xl font-bold text-slate-50">
          <Link to={`/trails/${trail.trailId}`} state={{ from }} className="hover:underline">
            {trail.trailName}
          </Link>
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <DifficultyBadge difficulty={trail.difficulty} />
          <WalkedToggle trail={trail} />
        </div>
      </header>

      <dl className="grid grid-cols-3 gap-2">
        {facts.map(([label, value]) => (
          <div key={label} className="rounded-xl bg-slate-800 p-2">
            <dt className="text-sm text-slate-400">{label}</dt>
            <dd className="text-base font-semibold text-slate-100">{value}</dd>
          </div>
        ))}
      </dl>

      <ElevationBar elevation={trail.elevation} />

      {trail.note && (
        <p className="line-clamp-3 wrap-break-word text-base text-slate-300">{trail.note}</p>
      )}
    </article>
  )
}
export default TrailCard