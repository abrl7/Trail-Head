
import { useUrlParam } from '../hooks/useUrlParam.js'

const FilterChip = ({ param, value }) => {
  const [current, setCurrent] = useUrlParam(param, 'All')
  const active = current === value

  return (
    <button
      type="button"
      onClick={() => setCurrent(value)}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-sm ${
        active
          ? 'border-indigo-400 bg-indigo-700 font-semibold text-white'
          : 'border-slate-600 text-slate-200 hover:bg-slate-800'
      }`}
    >
      {value}
    </button>
  )
}
export default FilterChip