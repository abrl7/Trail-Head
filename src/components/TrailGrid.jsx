
import TrailCard from './TrailCard.jsx'
import { useFilteredTrails } from '../hooks/useFilteredTrails.js'

const TrailGrid = () => {
  const filtered = useFilteredTrails()

  return (
    <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 p-6">
      {filtered.map((trail) => (
        <TrailCard key={trail.trailId} trail={trail} />
      ))}
    </div>
  )
}

export default TrailGrid