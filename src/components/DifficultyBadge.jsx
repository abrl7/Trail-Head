const STYLES = {
  Easy: 'bg-green-600 text-white',
  Moderate: 'bg-yellow-500 text-black',
  Hard: 'bg-red-600 text-white',
}

const DifficultyBadge = ({ difficulty }) => {
  if (!difficulty) return null
  return (
    <span className={`text-sm px-2 py-1 rounded-lg ${STYLES[difficulty] || 'bg-gray-500 text-white'}`}>
      {difficulty}
    </span>
  )
}

export default DifficultyBadge