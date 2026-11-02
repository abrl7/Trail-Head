import { useId } from 'react'
import { useUrlParam } from '../hooks/useUrlParam.js'
import { ui } from '../utils/ui.js'

const SearchInput = () => {
  const id = useId()
  const [q, setQ] = useUrlParam('q')

  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">Search trails by name or region</label>
      <svg aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        id={id}
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value, { replace: true })}
        placeholder="Search by name or region"
        className={`${ui.input} pl-10 pr-4`}
      />
    </div>
  )
}
export default SearchInput