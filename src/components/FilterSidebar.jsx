// FilterSidebar.jsx
const REGIONS = ['All', 'Annapurna', 'Langtang', 'Khumbu', 'Manaslu'];
const DIFFICULTIES = ['All', 'Easy', 'Moderate', 'Hard'];

const FilterSidebar = ({ region, difficulty, onRegionChange, onDifficultyChange, onClear }) => {
  return (
    <div className="w-56 shrink-0 bg-slate-100 rounded-2xl p-4 flex flex-col gap-4 h-fit">
      <div>
        <p className="text-sm font-bold text-gray-600 mb-1">Region</p>
        <select
          value={region}
          onChange={(e) => onRegionChange(e.target.value)}
          className="w-full p-2 rounded-xl bg-white"
        >
          {REGIONS.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div>
        <p className="text-sm font-bold text-gray-600 mb-1">Difficulty</p>
        <select
          value={difficulty}
          onChange={(e) => onDifficultyChange(e.target.value)}
          className="w-full p-2 rounded-xl bg-white"
        >
          {DIFFICULTIES.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      <button
        onClick={onClear}
        className="bg-red-500 text-white p-2 rounded-xl text-sm font-bold"
      >
        Clear filters
      </button>
    </div>
  );
};

export default FilterSidebar;