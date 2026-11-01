
// import DifficultyBadge from './DifficultyBadge';



// import { walkedCardBg } from '../utils/walkedStyle';
// import WalkedToggle from './WalkedToggle.jsx'
// import{ Link, useLocation } from "react-router-dom";
// import ElevationBar from './ElevationBar.jsx';



// const MAX_ELEVATION = 5500;

// const TrailCard = ({ trail}) => {
//   const elevation = Number(trail?.elevation) || 0;
//   const elevationPercent = Math.min(Math.max((elevation / MAX_ELEVATION) * 100, 0), 100);

//   const location = useLocation()
//   const from = location.pathname + location.search
 

//   return (
//     <>
//       <div className={`${walkedCardBg(trail.walked)} mx-auto w-full p-2 rounded-lg shadow-md m-2`}>
//         {/* div1 name area */}
//         <div className="heading flex flex-col gap-2 p-2">
//           <p className='text-sm font-bold text-gray-600'>{trail?.region}</p>
//           <Link to={`/trails/${trail.trailId}`} state={{ from }}><h1 className='text-3xl font-bold' >{trail?.trailName}</h1></Link>
          
//           <div className='flex gap-2'>
//             <p className={trail?.walked ? "bg-green-600 text-white px-2 text-sm p-1 rounded-lg" : "bg-red-600 px-2 text-white text-sm p-1 rounded-lg"}>{trail?.walked ? 'Walked' : 'Not Walked'}</p>
//             {/* <p className={checkDifficulty(trail?.difficulty)}>{trail?.difficulty}</p> */}
//             <DifficultyBadge difficulty={trail?.difficulty} />
//             <div className="ml-auto"><WalkedToggle trail={trail} /></div>
//           </div>
//         </div>

//         {/* div2 data area */}
//         <div className="data flex gap-3 p-2">
//           <div className='p-2 w-1/4 bg-slate-200 rounded-2xl flex flex-col'><p className='text-sm font-bold text-gray-600'>Season:</p> <p className='text-md font-bold'>{trail?.season}</p></div>
//           <div className='p-2 w-1/4 bg-slate-200 rounded-2xl flex flex-col'><p className='text-sm font-bold text-gray-600'>Distance:</p> <p className='text-md font-bold'>{trail?.distance} km</p></div>
//           <div className='p-2 w-1/4 bg-slate-200 rounded-2xl flex flex-col'><p className='text-sm font-bold text-gray-600'>Elevation:</p> <p className='text-md font-bold'>{trail?.elevation} m</p> </div>
//           <div className='p-2 w-1/4 bg-slate-200 rounded-2xl flex flex-col'><p className='text-sm font-bold text-gray-600'>Days:</p> <p className='text-md font-bold'>{trail?.days}</p></div>

//         </div>

//         <ElevationBar elevation={trail.elevation} />


//         {/* div3 desc area */}
//         <div className="note p-2">
//           <div className='p-2 flex flex-col rounded-2xl bg-slate-200'>
//             <p className='text-sm font-bold text-gray-600'>Note:</p> <p className='text-md overflow-y-auto wrap-break-word whitespace-pre-wrap'>{trail?.note}</p>
//           </div>
//         </div>
//       </div>



//     </>
//   )
// }

// export default TrailCard


// components/TrailCard.jsx
import { Link, useLocation } from 'react-router-dom'
import DifficultyBadge from './DifficultyBadge.jsx'
import WalkedToggle from './WalkedToggle.jsx'
import ElevationBar from './ElevationBar.jsx'
import { walkedCardBg } from '../utils/walkedStyle.js'

const TrailCard = ({ trail }) => {
  const location = useLocation()
  const from = location.pathname + location.search

  const facts = [
    ['Season', trail.season || '—'],
    ['Distance', `${trail.distance} km`],
    ['Days', trail.days],
  ]

  return (
    <article className={`flex h-full flex-col gap-4 rounded-2xl border p-4 ${walkedCardBg(trail.walked)}`}>
      <header className="flex flex-col gap-2">
        <p className="text-sm font-medium text-slate-400">{trail.region}</p>
        <h2 className="wrap-break-word text-2xl font-bold text-slate-50">
          <Link to={`/trails/${trail.trailId}`} state={{ from }} className="hover:underline">
            {trail.trailName}
          </Link>
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <DifficultyBadge difficulty={trail.difficulty} />
          <WalkedToggle trail={trail} />
        </div>
      </header>

      <dl className="grid grid-cols-3 gap-2">
        {facts.map(([label, value]) => (
          <div key={label} className="rounded-xl bg-slate-800 p-2">
            <dt className="text-sm text-slate-400">{label}</dt>
            <dd className="text-base font-semibold text-slate-100">{value}</dd>
          </div>
        ))}
      </dl>

      <ElevationBar elevation={trail.elevation} />

      {trail.note && (
        <p className="line-clamp-3 wrap-break-word text-base text-slate-300">{trail.note}</p>
      )}
    </article>
  )
}
export default TrailCard