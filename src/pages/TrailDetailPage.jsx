import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useTrails } from '../hooks/useTrails.js'
import DifficultyBadge from '../components/DifficultyBadge.jsx'
import WalkedToggle from '../components/WalkedToggle.jsx'
import { walkedCardBg } from '../utils/walkedStyle.js'


const TrailDetailPage = () => {
   const { id } = useParams()
  const { trails, removeTrail } = useTrails()
  const location = useLocation()
  const navigate = useNavigate()

  const backTo = location.state?.from || '/trails'

  // const { trails } = useContext(trailContext);

  const trail = trails.find((t) => t.trailId === id);


  if (!trail) {
    return (
      <div className='p-4 text-red-500'>
        <p>Trail not found.</p>
        <Link to={backTo}>
          <button className='bg-blue-500 text-white px-4 py-2 rounded-lg' >
            Return to Trails List
          </button></Link>
      </div>
    );
  }

  const handleRemove = () => {
    if (!window.confirm(`Remove "${trail.trailName}"?`)) return
    removeTrail(trail.trailId)
    navigate(backTo, { replace: true })
  }

  return (
    <>
      <div className={`${walkedCardBg(trail.walked)} mx-auto w-2/3 p-4 rounded-lg shadow-md m-4`}>
        {/* div1 */}
        <div className="heading flex flex-col gap-2 p-2">
          <p className='text-sm font-bold text-gray-600'>{trail?.region}</p>
          <h1 className='text-3xl font-bold'>{trail?.trailName}</h1>
          <div className='flex gap-2'>

            <p className={trail?.walked ? "bg-green-600 text-white px-2 text-sm p-1 rounded-lg" : "bg-red-600 px-2 text-white text-sm p-1 rounded-lg"}>{trail?.walked ? 'Walked' : 'Not Walked'}</p>
            {/* <p className={checkDifficulty(trail.difficulty)}>{trail?.difficulty}</p> */}
            <DifficultyBadge difficulty={trail?.difficulty} />

            <div className="ml-auto"><WalkedToggle trail={trail} /></div>
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
            <p className='text-sm font-bold text-gray-600'>Note:</p> <p className='text-md overflow-y-auto wrap-break-word whitespace-pre-wrap'>{trail?.note}</p>
          </div>
          <button
            onClick={handleRemove}
            className='mt-3 px-3 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700'
          >
            Remove trail
          </button>
          
        </div>
      </div>
      <Link to={backTo}>
        <button className='bg-blue-500 text-white px-4 py-2 rounded-lg' >
          Return to Trails List
        </button></Link>


    </>

  )
}

export default TrailDetailPage