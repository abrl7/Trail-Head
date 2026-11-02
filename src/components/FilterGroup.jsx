import { useId } from 'react'
import FilterChip from './FilterChip.jsx'
import { ui } from '../utils/ui.js'

const FilterGroup = ({ label, param, options }) => {
  const id = useId()
  return (
    <div role="group" aria-labelledby={id} className="flex flex-col gap-2">
      <p id={id} className={ui.label}>{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => <FilterChip key={o} param={param} value={o} />)}
      </div>
    </div>
  )
}
export default FilterGroup