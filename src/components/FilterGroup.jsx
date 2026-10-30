
import FilterChip from './FilterChip.jsx'

const FilterGroup = ({ label, param, options }) => (
  <div>
    <p className="text-sm font-bold text-gray-600 mb-2">{label}</p>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <FilterChip key={option} param={param} value={option} />
      ))}
    </div>
  </div>
)

export default FilterGroup