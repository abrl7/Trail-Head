import React from 'react'
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import trailContext from '../context/trailContext.js';
import { checkDifficulty } from '../utils/checkDifficulty.js';

const TrailDetailPage = ({trails}) => {
  const { id } = useParams();

  // const { trails } = useContext(trailContext);

  const trail = trails.find((t) => t.trailId === id);
  

  if (!trail) {
    return <p className='p-4 text-red-500'>Trail not found.</p>;
  }

  return (
    <div className='bg-blue-50 mx-auto w-2/3 p-4 rounded-lg shadow-md m-4'>
      {/* div1 */}
      <div className="heading flex flex-col gap-2 p-2">
        <p className='text-sm font-bold text-gray-600'>{trail?.region}</p>
        <h1 className='text-3xl font-bold'>{trail?.trailName}</h1>
        <div className='flex gap-2'>

        <p className={trail?.walked ? "bg-green-600 text-white px-2 text-sm p-1 rounded-lg":"bg-red-600 px-2 text-white text-sm p-1 rounded-lg"}>{trail?.walked ? 'Walked' : 'Not Walked'}</p>
        <p className={checkDifficulty(trail.difficulty)}>{trail?.difficulty}</p>
        </div>
      </div>

      {/* div2 */}
      <div className="data flex gap-3 p-2">
        <div className='p-4 w-1/4 bg-slate-200 rounded-2xl flex flex-col'><p className='text-sm font-bold text-gray-600'>Season:</p> <p className='text-2xl font-bold'>{trail?.season}</p></div>
        <div className='p-4 w-1/4 bg-slate-200 rounded-2xl flex flex-col'><p className='text-sm font-bold text-gray-600'>Distance:</p> <p className='text-2xl font-bold'>{trail?.distance} km</p></div>
        <div className='p-4 w-1/4 bg-slate-200 rounded-2xl flex flex-col'><p className='text-sm font-bold text-gray-600'>Elevation:</p> <p className='text-2xl font-bold'>{trail?.elevation} m</p> </div>
        <div className='p-4 w-1/4 bg-slate-200 rounded-2xl flex flex-col'><p className='text-sm font-bold text-gray-600'>Days:</p> <p className='text-2xl font-bold'>{trail?.days}</p></div>

      </div>
      {/* div3 */}
      <div className="note p-2">
        <div className='p-4 flex flex-col rounded-2xl bg-slate-200 '>
        <p className='text-sm font-bold text-gray-600'>Note:</p> <p className='text-md overflow-y-auto break-words whitespace-pre-wrap'>{trail?.note}</p>
        </div>
      </div>
    </div>
  )
}

export default TrailDetailPage