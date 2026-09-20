import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';

// 1. without react-hook-form,
const LogTrailPage = () => {

  const navigate = useNavigate();


  const [trails, settrails] = useState([])
  const [reqTrailName, setreqTrailName] = useState(true)

  const [trailForm, settrailForm] = useState({
    "trailName": "",
    "region": "",
    "distance": "",
    "elevation": "",
    "difficulty": "",
    "days": "",
    "season": "",
    "walked": true,
    "note": ""

  })

  const generateTrailId = (num) => {
    return `tr-${String(num).padStart(3, "0")}`;
  }

  const addTrail = (e) => {
    e.preventDefault()
    if (!trailForm.trailName) {
      setreqTrailName(false)
    }
    else {
      setreqTrailName(true)
      const newTrail = {
        trailId: generateTrailId(trails.length + 1),
        ...trailForm
      }

      settrails((prevTrails) => [...prevTrails, newTrail])

      settrailForm({
        "trailName": "",
        "region": "",
        "distance": "",
        "elevation": "",
        "difficulty": "",
        "days": "",
        "season": "",
        "walked": true,
        "note": ""
      })
      console.log("All Trails:", [...trails, newTrail])
      navigate(`/trails/${newTrail.trailId}`); 
    }


  }

  const handleChange = (e) => {
    e.target.type === "checkbox" ? settrailForm({ ...trailForm, [e.target.name]: e.target.checked }) : settrailForm({ ...trailForm, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className="formContainer m-5 ">

        <form className='bg-pink-300 mx-auto w-[60vw] p-5 rounded-xl min-h-[60vh]' action="" onSubmit={addTrail}>

          <div className='act-form flex flex-col gap-5'>

            <div className='trailName flex flex-col gap-1'>
              <label className='font-bold p-1' htmlFor="trailName">Trail Name:</label>
              <input className='bg-white p-2 rounded-2xl' type="text" placeholder="Enter trail name" name="trailName" id="trailName" value={trailForm.trailName} onChange={handleChange} />
              {!reqTrailName && <span className='text-red-500'>Trail name is required</span>}
            </div>

            <div className='flex flex-col gap-1'>
              <label className='font-bold p-1' htmlFor="region">Region:</label>
              {/* <input className='bg-white p-2 rounded-2xl' type="text" placeholder="Enter region" name="region" id="region" value={trailForm.region} onChange={handleChange} /> */}
              <select className='bg-white p-2 rounded-2xl' name="region" id="region" value={trailForm.region} onChange={handleChange}>
                <option value="">Select a region</option>
                <option value="Region 1">Annapurna</option>
                <option value="Region 2">Langtang</option>
                <option value="Region 3">Khumbu</option>
                <option value="Region 4">Manaslu</option>
              </select>
            </div>

            <div className='flex gap-3 ' >

              <div className='flex gap-1 w-1/3'>
                <label className='font-bold py-2 w-1/2' htmlFor="distance">Distance(in km)</label>
                <input className='bg-white p-2 rounded-2xl w-1/2' type="number" placeholder="Enter distance" name="distance" id="distance" value={trailForm.distance} onChange={handleChange} />
              </div>

              <div className='flex gap-1 w-1/3'>
                <label className='font-bold py-2 w-1/2' htmlFor="elevation">Elevation(in m) </label>
                <input className='bg-white p-2 rounded-2xl w-1/2' type="number" placeholder="Enter elevation" name="elevation" id="elevation" value={trailForm.elevation} onChange={handleChange} />
              </div>

              <div className='flex gap-1 w-1/3'>
                <label className='font-bold py-2 w-1/2 text-center' htmlFor="days">Days</label>
                <input className='bg-white p-2 rounded-2xl w-1/2' type="number" placeholder="Enter days" name="days" id="days" value={trailForm.days} onChange={handleChange} />
              </div>
            </div>

            <div className='flex flex-col gap-1'>
              <label className='font-bold p-1' htmlFor="difficulty">Difficulty</label>
              {/* <input className='bg-white p-2 rounded-2xl' type="text" placeholder="Enter region" name="region" id="region" value={trailForm.region} onChange={handleChange} /> */}
              <select className='bg-white p-2 rounded-2xl' name="difficulty" id="difficulty" value={trailForm.difficulty} onChange={handleChange}>
                <option value="">Select a difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Difficult">Difficult</option>
              </select>
            </div>

            <div className='flex gap-1'>
              <label className='font-bold p-1' htmlFor="walked">Walked:</label>
              <input className='bg-white p-2 rounded-2xl' type="checkbox" placeholder="Enter trail name" name="walked" id="walked" value={trailForm.walked} onChange={handleChange} />
            </div>

            <div className='flex flex-col gap-1'>
              <label className='font-bold p-1' htmlFor="note">Note:</label>
              <input className='bg-white p-2 rounded-2xl' type="textarea" placeholder="Enter note" name="note" id="note" value={trailForm.note} onChange={handleChange} />
            </div>
            <div className='flex gap-1 justify-center'>
              <button className='bg-blue-500 text-white p-2 rounded-2xl' type="submit">
                Add Trail
              </button>
            </div>
          </div>


        </form>
      </div>

    </>
  )
}

// const LogTrailPage = () => {
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm()

//   const [trails, settrails] = useState([])

//   const [trailForm, settrailForm] = useState({
//     "trailName": "",
//     "region": "",
//     "distance": "",
//     "elevation": "",
//     "difficulty": "",
//     "days": "",
//     "season": "",
//     "walked": true,
//     "note": ""

//   })

//   const generateTrailId=(num)=>{
//     return `tr-${String(num).padStart(3,"0")}`;
//   }

//   const addTrail=(e)=>{
//     e.preventDefault()
//     const newTrail={
//       trailId:generateTrailId(trails.length+1),
//       ...trailForm
//     }

//     settrails((prevTrails)=>[...prevTrails,newTrail])

//     settrailForm({
//     "trailName": "",
//     "region": "",
//     "distance": "",
//     "elevation": "",
//     "difficulty": "",
//     "days": "",
//     "season": "",
//     "walked": true,
//     "note": ""
//   })
//  console.log("All Trails:",[...trails,newTrail])
//   // navigate(`/trail/${newTrail.trailId}`); 


//   }

//   const handleChange = (e) => {
//     e.target.type === "checkbox" ? settrailForm({ ...trailForm, [e.target.name]: e.target.checked }) : settrailForm({ ...trailForm, [e.target.name]: e.target.value })
//   }

//   return (
//     <>
//       <div className="formContainer m-5 ">

//         <form className='bg-pink-300 mx-auto w-[60vw] p-5 rounded-xl min-h-[60vh]' action="" onSubmit={handleSubmit(addTrail)}>

//           <div className='act-form flex flex-col gap-5'>

//             <div className='flex flex-col gap-1'>
//               <label className='font-bold p-1' htmlFor="trailName">Trail Name:</label>
//               <input className='bg-white p-2 rounded-2xl' type="text" placeholder="Enter trail name" name="trailName" id="trailName"  {...register("trailName",{required:{value:true,message:"Trail name is required"}})}  />
//               {errors.trailName && <span className='text-red-500'>{errors.trailName.message}</span>}
//             </div>

//             <div className='flex flex-col gap-1'>
//               <label className='font-bold p-1' htmlFor="region">Region:</label>
//               {/* <input className='bg-white p-2 rounded-2xl' type="text" placeholder="Enter region" name="region" id="region" value={trailForm.region} onChange={handleChange} /> */}
//               <select className='bg-white p-2 rounded-2xl' name="region" id="region" value={trailForm.region} onChange={handleChange}>
//                 <option value="">Select a region</option>
//                 <option value="Region 1">Annapurna</option>
//                 <option value="Region 2">Langtang</option>
//                 <option value="Region 3">Khumbu</option>
//                 <option value="Region 4">Manaslu</option>
//               </select>
//             </div>

//             <div className='flex gap-3 ' >

//               <div className='flex gap-1 w-1/3'>
//                 <label className='font-bold py-2 w-1/2' htmlFor="distance">Distance(in km)</label>
//                 <input className='bg-white p-2 rounded-2xl w-1/2' type="number" placeholder="Enter distance" name="distance" id="distance" value={trailForm.distance} onChange={handleChange} />
//               </div>

//               <div className='flex gap-1 w-1/3'>
//                 <label className='font-bold py-2 w-1/2' htmlFor="elevation">Elevation(in m) </label>
//                 <input className='bg-white p-2 rounded-2xl w-1/2' type="number" placeholder="Enter elevation" name="elevation" id="elevation" value={trailForm.elevation} onChange={handleChange} />
//               </div>

//               <div className='flex gap-1 w-1/3'>
//                 <label className='font-bold py-2 w-1/2 text-center' htmlFor="days">Days</label>
//                 <input className='bg-white p-2 rounded-2xl w-1/2' type="number" placeholder="Enter days" name="days" id="days" value={trailForm.days} onChange={handleChange} />
//               </div>
//             </div>

//             <div className='flex flex-col gap-1'>
//               <label className='font-bold p-1' htmlFor="difficulty">Difficulty</label>
//               {/* <input className='bg-white p-2 rounded-2xl' type="text" placeholder="Enter region" name="region" id="region" value={trailForm.region} onChange={handleChange} /> */}
//               <select className='bg-white p-2 rounded-2xl' name="difficulty" id="difficulty" value={trailForm.difficulty} onChange={handleChange}>
//                 <option value="">Select a difficulty</option>
//                 <option value="Easy">Easy</option>
//                 <option value="Moderate">Moderate</option>
//                 <option value="Difficult">Difficult</option>
//               </select>
//             </div>

//             <div className='flex gap-1'>
//               <label className='font-bold p-1' htmlFor="walked">Walked:</label>
//               <input className='bg-white p-2 rounded-2xl' type="checkbox" placeholder="Enter trail name" name="walked" id="walked" value={trailForm.walked} onChange={handleChange} />
//             </div>

//             <div className='flex flex-col gap-1'>
//               <label className='font-bold p-1' htmlFor="note">Note:</label>
//               <input className='bg-white p-2 rounded-2xl' type="textarea" placeholder="Enter note" name="note" id="note" value={trailForm.note} onChange={handleChange} />
//             </div>
//             <div className='flex gap-1 justify-center'>
//               <button className='bg-blue-500 text-white p-2 rounded-2xl' type="submit">
//                 Add Trail
//               </button>
//             </div>
//           </div>


//         </form>
//       </div>

//     </>
//   )
// }

export default LogTrailPage