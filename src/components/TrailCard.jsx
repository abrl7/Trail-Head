import React from 'react'

const TrailCard = ({trails,checkDifficulty}) => {
  return (
    <>
     {trails.map((trail, index) => {
        // return <div key={trail.trailId} className='bg-white p-4 rounded-lg shadow-md mb-4'>
        //   <h2 className='text-xl font-bold'>{trail.trailName}</h2>
        //   <p className='text-gray-600'>{trail.region}</p>
        //   <p className='text-gray-600'>Distance: {trail.distance} km</p>
        //   <p className='text-gray-600'>Elevation: {trail.elevation} m</p>
        //   <p className='text-gray-600'>Difficulty: {trail.difficulty}</p>
        //   <p className='text-gray-600'>Days: {trail.days}</p>
        //   <p className='text-gray-600'>Season: {trail.season}</p>
        //   <p className='text-gray-600'>Walked: {trail.walked ? 'Yes' : 'No'}</p>
        //   <p className='text-gray-600'>Note: {trail.note}</p>
        // </div>
        return (
          
          
          <div className='bg-blue-50 mx-auto w-full p-2 rounded-lg shadow-md m-2' key={trail.trailId}>
            {/* div1 */}
            <div className="heading flex flex-col gap-2 p-2">
              <p className='text-sm font-bold text-gray-600'>{trail?.region}</p>
              <h1 className='text-3xl font-bold'>{trail?.trailName}</h1>
              <div className='flex gap-2'>

                <p className={trail?.walked ? "bg-green-600 text-white px-2 text-sm p-1 rounded-lg" : "bg-red-600 px-2 text-white text-sm p-1 rounded-lg"}>{trail?.walked ? 'Walked' : 'Not Walked'}</p>
                <p className={checkDifficulty(trail.difficulty)}>{trail?.difficulty}</p>
              </div>
            </div>

            {/* div2 */}
            <div className="data flex gap-3 p-2">
              <div className='p-2 w-1/4 bg-slate-200 rounded-2xl flex flex-col'><p className='text-sm font-bold text-gray-600'>Season:</p> <p className='text-md font-bold'>{trail?.season}</p></div>
              <div className='p-2 w-1/4 bg-slate-200 rounded-2xl flex flex-col'><p className='text-sm font-bold text-gray-600'>Distance:</p> <p className='text-md font-bold'>{trail?.distance} km</p></div>
              <div className='p-2 w-1/4 bg-slate-200 rounded-2xl flex flex-col'><p className='text-sm font-bold text-gray-600'>Elevation:</p> <p className='text-md font-bold'>{trail?.elevation} m</p> </div>
              <div className='p-2 w-1/4 bg-slate-200 rounded-2xl flex flex-col'><p className='text-sm font-bold text-gray-600'>Days:</p> <p className='text-md font-bold'>{trail?.days}</p></div>

            </div>
            {/* div3 */}
            <div className="note p-2">
              <div className='p-2 flex flex-col rounded-2xl bg-slate-200'>
                <p className='text-sm font-bold text-gray-600'>Note:</p> <p className='text-md overflow-y-auto break-words whitespace-pre-wrap'>{trail?.note}</p>
              </div>
            </div>
          </div>
          
        )
      })}
    </>
  )
}

export default TrailCard