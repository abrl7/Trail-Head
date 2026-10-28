import { useTrails } from '../hooks/useTrails.js'

const WalkedToggle = ({ trail }) => {
  const { toggleWalked } = useTrails()

  return (
    <button
      onClick={() => toggleWalked(trail.trailId)}
      className="px-3 py-1 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 text-sm"
    >
      {trail.walked ? 'Mark as not walked' : 'Mark as walked'}
    </button>
  )
}

export default WalkedToggle