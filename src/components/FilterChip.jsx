
import { useUrlParam } from '../hooks/useUrlParam.js'

const FilterChip = ({ param, value }) => {
  const [current, setCurrent] = useUrlParam(param, 'All')
  const active = current === value

  return (
    <button
      onClick={() => setCurrent(value)}
      aria-pressed={active}
      className={`px-3 py-1 rounded-full text-sm border ${
        active
          ? 'bg-blue-500 text-white border-blue-500'
          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
      }`}
    >
      {value}
    </button>
  )
}

export default FilterChip