import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTrails } from '../hooks/useTrails.js'

const EMPTY_FORM = {
  trailName: '',
  region: '',
  distance: '',
  elevation: '',
  difficulty: '',
  days: '',
  season: '',
  walked: false,
  note: '',
}

const LogTrailPage = () => {
  const { addTrail } = useTrails()
  const navigate = useNavigate()

  const [trailForm, setTrailForm] = useState(EMPTY_FORM)
  const [reqTrailName, setReqTrailName] = useState(true)

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target
    setTrailForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleAddTrail = (e) => {
    e.preventDefault()

    if (!trailForm.trailName.trim()) {
      setReqTrailName(false)
      return
    }
    setReqTrailName(true)

    // The provider builds the ID and returns the finished trail
    const created = addTrail({
      ...trailForm,
      trailName: trailForm.trailName.trim(),
      distance: Number(trailForm.distance) || 0,
      elevation: Number(trailForm.elevation) || 0,
      days: Number(trailForm.days) || 0,
    })

    navigate(`/trails/${created.trailId}`)
  }

  return (
    <div className="formContainer m-5">
      <form
        className="bg-blue-50 mx-auto w-[60vw] p-5 rounded-xl min-h-[60vh]"
        onSubmit={handleAddTrail}
      >
        <div className="act-form flex flex-col gap-5">

          <div className="trailName flex flex-col gap-1">
            <label className="font-bold p-1" htmlFor="trailName">Trail Name:</label>
            <input
              className="bg-white p-2 rounded-2xl"
              type="text"
              placeholder="Enter trail name"
              name="trailName"
              id="trailName"
              value={trailForm.trailName}
              onChange={handleChange}
            />
            {!reqTrailName && <span className="text-red-500">Trail name is required</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-bold p-1" htmlFor="region">Region:</label>
            <select
              className="bg-white p-2 rounded-2xl"
              name="region"
              id="region"
              value={trailForm.region}
              onChange={handleChange}
            >
              <option value="">Select a region</option>
              <option value="Annapurna">Annapurna</option>
              <option value="Langtang">Langtang</option>
              <option value="Khumbu">Khumbu</option>
              <option value="Manaslu">Manaslu</option>
            </select>
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col gap-1 w-1/2">
              <label className="font-bold p-1" htmlFor="difficulty">Difficulty:</label>
              <select
                className="bg-white p-2 rounded-2xl"
                name="difficulty"
                id="difficulty"
                value={trailForm.difficulty}
                onChange={handleChange}
              >
                <option value="">Select a difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="flex flex-col gap-1 w-1/2">
              <label className="font-bold p-1" htmlFor="season">Season:</label>
              <select
                className="bg-white p-2 rounded-2xl"
                name="season"
                id="season"
                value={trailForm.season}
                onChange={handleChange}
              >
                <option value="">Select a season</option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
                <option value="Autumn">Autumn</option>
                <option value="Winter">Winter</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex gap-1 w-1/3">
              <label className="font-bold py-2 w-1/2" htmlFor="distance">Distance (km)</label>
              <input
                className="bg-white p-2 rounded-2xl w-1/2"
                type="number"
                min="0"
                placeholder="Enter distance"
                name="distance"
                id="distance"
                value={trailForm.distance}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-1 w-1/3">
              <label className="font-bold py-2 w-1/2" htmlFor="elevation">Elevation (m)</label>
              <input
                className="bg-white p-2 rounded-2xl w-1/2"
                type="number"
                min="0"
                placeholder="Enter elevation"
                name="elevation"
                id="elevation"
                value={trailForm.elevation}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-1 w-1/3">
              <label className="font-bold py-2 w-1/2 text-center" htmlFor="days">Days</label>
              <input
                className="bg-white p-2 rounded-2xl w-1/2"
                type="number"
                min="0"
                placeholder="Enter days"
                name="days"
                id="days"
                value={trailForm.days}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex gap-1">
            <label className="font-bold p-1" htmlFor="walked">Walked:</label>
            <input
              className="bg-white p-2 rounded-2xl"
              type="checkbox"
              name="walked"
              id="walked"
              checked={trailForm.walked}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-bold p-1" htmlFor="note">Note:</label>
            <textarea
              className="bg-white p-2 rounded-2xl"
              placeholder="Enter note"
              name="note"
              id="note"
              value={trailForm.note}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div className="flex gap-1 justify-center">
            <button className="bg-blue-500 text-white p-2 rounded-2xl" type="submit">
              Add Trail
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LogTrailPage