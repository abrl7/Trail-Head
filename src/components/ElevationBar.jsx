// components/ElevationBar.jsx
const MAX_ELEVATION = 5500

const ElevationBar = ({ elevation }) => {
  const value = Number(elevation) || 0
  const pct = Math.min(Math.max((value / MAX_ELEVATION) * 100, 0), 100)

  return (
    <div>
      <div className="mb-2 flex justify-between text-sm text-slate-400">
        <span>Highest point</span>
        <span>{value.toLocaleString()} / {MAX_ELEVATION.toLocaleString()} m</span>
      </div>
      {/* the text above carries the information, so the bar is decoration */}
      <div aria-hidden="true" className="h-2 overflow-hidden rounded-full bg-slate-800">
        <div className="h-full rounded-full bg-slate-300" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
export default ElevationBar