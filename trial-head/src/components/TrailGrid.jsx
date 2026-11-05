
import TrailCard from './TrailCard.jsx'
import { useFilteredTrails } from '../hooks/useFilteredTrails.js'

const TrailGrid = () => {
  const filtered = useFilteredTrails()
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {filtered.map((trail) => (
        <li key={trail.trailId}><TrailCard trail={trail} /></li>
      ))}
    </ul>
  )
}
export default TrailGrid