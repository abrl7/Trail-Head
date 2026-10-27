
import DifficultyBadge from './DifficultyBadge';
import { walkedCardBg } from '../utils/walkedStyle';

import{ Link, useLocation } from "react-router-dom";



const MAX_ELEVATION = 5500;

const TrailCard = ({ trail, onToggleWalked }) => {
  const elevation = Number(trail?.elevation) || 0;
  const elevationPercent = Math.min(Math.max((elevation / MAX_ELEVATION) * 100, 0), 100);

  const location = useLocation()
  const from = location.pathname + location.search
 

  return (
    <>
      <div className={`${walkedCardBg(trail.walked)} mx-auto w-full p-2 rounded-lg shadow-md m-2`}>
        {/* div1 name area */}
        <div className="heading flex flex-col gap-2 p-2">
          <p className='text-sm font-bold text-gray-600'>{trail?.region}</p>
          <Link to={`/trails/${trail.trailId}`} state={{ from }}><h1 className='text-3xl font-bold' >{trail?.trailName}</h1></Link>
          
          <div className='flex gap-2'>
            <p className={trail?.walked ? "bg-green-600 text-white px-2 text-sm p-1 rounded-lg" : "bg-red-600 px-2 text-white text-sm p-1 rounded-lg"}>{trail?.walked ? 'Walked' : 'Not Walked'}</p>
            {/* <p className={checkDifficulty(trail?.difficulty)}>{trail?.difficulty}</p> */}
            <DifficultyBadge difficulty={trail?.difficulty} />
            <button
            onClick={() => onToggleWalked(trail.trailId)}
            className='ml-auto text-sm px-3 py-1 rounded-lg bg-white border border-gray-300 hover:bg-gray-100'>
            {trail.walked ? 'Mark as not walked' : 'Mark as walked'}
          </button>
          </div>
        </div>

        {/* div2 data area */}
        <div className="data flex gap-3 p-2">
          <div className='p-2 w-1/4 bg-slate-200 rounded-2xl flex flex-col'><p className='text-sm font-bold text-gray-600'>Season:</p> <p className='text-md font-bold'>{trail?.season}</p></div>
          <div className='p-2 w-1/4 bg-slate-200 rounded-2xl flex flex-col'><p className='text-sm font-bold text-gray-600'>Distance:</p> <p className='text-md font-bold'>{trail?.distance} km</p></div>
          <div className='p-2 w-1/4 bg-slate-200 rounded-2xl flex flex-col'><p className='text-sm font-bold text-gray-600'>Elevation:</p> <p className='text-md font-bold'>{trail?.elevation} m</p> </div>
          <div className='p-2 w-1/4 bg-slate-200 rounded-2xl flex flex-col'><p className='text-sm font-bold text-gray-600'>Days:</p> <p className='text-md font-bold'>{trail?.days}</p></div>

        </div>

        {/* elevation bar */}
        <div className="p-2">
          <div className="flex justify-between text-sm font-bold text-gray-600 mb-1">
            <span>Highest point</span>
            <span>{elevation} m / {MAX_ELEVATION} m</span>
          </div>
          <div
            className="w-full h-2 bg-slate-200 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={Math.min(elevation, MAX_ELEVATION)}
            aria-valuemin={0}
            aria-valuemax={MAX_ELEVATION}
            aria-label="Elevation relative to 5,500 m"
          >
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${elevationPercent}%` }}
            />
          </div>
        </div>

        {/* div3 desc area */}
        <div className="note p-2">
          <div className='p-2 flex flex-col rounded-2xl bg-slate-200'>
            <p className='text-sm font-bold text-gray-600'>Note:</p> <p className='text-md overflow-y-auto wrap-break-word whitespace-pre-wrap'>{trail?.note}</p>
          </div>
        </div>
      </div>



    </>
  )
}

export default TrailCard