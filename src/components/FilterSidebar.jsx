// FilterSidebar.jsx
const REGIONS = ['All', 'Annapurna', 'Langtang', 'Khumbu', 'Manaslu'];
const DIFFICULTIES = ['All', 'Easy', 'Moderate', 'Hard'];

const FilterSidebar = ({ region, difficulty, onRegionChange, onDifficultyChange, onClear }) => {
  return (
    <div className="flex p-2 gap-2">
      <div className="flex gap-2 items-center p-4">
        <p className="text-sm font-bold">Region:</p>
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

      <div className="flex gap-2 items-center  p-4">
        <p className="text-sm font-bold">Difficulty:</p>
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
        className="  text-white p-2 rounded-full text-sm font-bold"
      >
       <p className="bg-red-600 rounded-full p-2">Clear filters</p> 
      </button>
    </div>
  );
};

export default FilterSidebar;