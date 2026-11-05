// // FilterSidebar.jsx
// const REGIONS = ['All', 'Annapurna', 'Langtang', 'Khumbu', 'Manaslu'];
// const DIFFICULTIES = ['All', 'Easy', 'Moderate', 'Hard'];

// const FilterSidebar = ({ region, difficulty, onRegionChange, onDifficultyChange, onClear }) => {
//   return (
//     <div className="flex p-2 gap-2">
//       <div className="flex gap-2 items-center p-4">
//         <p className="text-sm font-bold">Region:</p>
//         <select
//           value={region}
//           onChange={(e) => onRegionChange(e.target.value)}
//           className="w-full p-2 rounded-xl bg-white"
//         >
//           {REGIONS.map((r) => (
//             <option key={r} value={r}>{r}</option>
//           ))}
//         </select>
//       </div>

//       <div className="flex gap-2 items-center  p-4">
//         <p className="text-sm font-bold">Difficulty:</p>
//         <select
//           value={difficulty}
//           onChange={(e) => onDifficultyChange(e.target.value)}
//           className="w-full p-2 rounded-xl bg-white"
//         >
//           {DIFFICULTIES.map((d) => (
//             <option key={d} value={d}>{d}</option>
//           ))}
//         </select>
//       </div>

//       <button
//         onClick={onClear}
//         className="  text-white p-2 rounded-full text-sm font-bold"
//       >
//        <p className="bg-red-600 rounded-full p-2">Clear filters</p> 
//       </button>
//     </div>
//   );
// };

// export default FilterSidebar;

import { ui } from '../utils/ui.js'
import { useSearchParams } from 'react-router-dom'
import FilterGroup from './FilterGroup.jsx'

const REGIONS = ['All', 'Annapurna', 'Langtang', 'Khumbu', 'Manaslu']
const DIFFICULTIES = ['All', 'Easy', 'Moderate', 'Hard']

const FilterSidebar = () => {

  const [, setSearchParams] = useSearchParams()
  return (
    <aside
      aria-label="Filters"
      className={`${ui.surface} flex w-full shrink-0 flex-col gap-4 p-4 lg:sticky lg:top-6 lg:w-64 lg:self-start`}
    >
      <FilterGroup label="Region" param="region" options={REGIONS} />
      <FilterGroup label="Difficulty" param="difficulty" options={DIFFICULTIES} />
      <button type="button" onClick={() => setSearchParams({})} className={ui.btnSecondary}>
        Clear filters
      </button>
    </aside>
  )
}

export default FilterSidebar