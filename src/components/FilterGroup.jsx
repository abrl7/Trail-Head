
// import FilterChip from './FilterChip.jsx'

// const FilterGroup = ({ label, param, options }) => (
//   <div>
//     <p className="text-sm font-bold text-gray-600 mb-2">{label}</p>
//     <div className="flex flex-wrap gap-2">
//       {options.map((option) => (
//         <FilterChip key={option} param={param} value={option} />
//       ))}
//     </div>
//   </div>
// )

// export default FilterGroup


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