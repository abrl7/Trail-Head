import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTrails } from '../hooks/useTrails.js'
import { ui } from '../utils/ui.js'

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

const REGIONS = ['Annapurna', 'Langtang', 'Khumbu', 'Manaslu']
const DIFFICULTIES = ['Easy', 'Moderate', 'Hard']
const SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter']

const Field = ({ id, label, children }) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className={ui.label}>{label}</label>
    {children}
  </div>
)

const LogTrailPage = () => {
  const { addTrail } = useTrails()
  const navigate = useNavigate()
  const nameRef = useRef(null)

  const [form, setForm] = useState(EMPTY_FORM)
  const [nameError, setNameError] = useState(false)

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.trailName.trim()) {
      setNameError(true)
      nameRef.current?.focus()   // send keyboard and screen reader users to the problem
      return
    }
    setNameError(false)

    const created = addTrail({
      ...form,
      trailName: form.trailName.trim(),
      distance: Number(form.distance) || 0,
      elevation: Number(form.elevation) || 0,
      days: Number(form.days) || 0,
    })
    navigate(`/trails/${created.trailId}`)
  }

  const selectClass = `${ui.input} px-4`
  const inputClass = `${ui.input} px-4`

  return (
    <div className="mx-auto w-full max-w-2xl">
      <h1 className={`${ui.title} mb-6`}>Log a trail</h1>

      <form onSubmit={handleSubmit} noValidate className={`${ui.surface} flex flex-col gap-6 p-4 sm:p-6`}>

        <Field id="trailName" label="Trail name">
          <input
            ref={nameRef}
            id="trailName"
            name="trailName"
            type="text"
            value={form.trailName}
            onChange={handleChange}
            placeholder="e.g. Annapurna Base Camp"
            aria-required="true"
            aria-invalid={nameError}
            aria-describedby={nameError ? 'trailName-error' : undefined}
            className={inputClass}
          />
          {nameError && (
            <p id="trailName-error" role="alert" className="text-sm font-medium text-rose-300">
              Trail name is required.
            </p>
          )}
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field id="region" label="Region">
            <select id="region" name="region" value={form.region} onChange={handleChange} className={selectClass}>
              <option value="">Select a region</option>
              {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </Field>

          <Field id="difficulty" label="Difficulty">
            <select id="difficulty" name="difficulty" value={form.difficulty} onChange={handleChange} className={selectClass}>
              <option value="">Select a difficulty</option>
              {DIFFICULTIES.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </Field>

          <Field id="season" label="Season">
            <select id="season" name="season" value={form.season} onChange={handleChange} className={selectClass}>
              <option value="">Select a season</option>
              {SEASONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field id="distance" label="Distance (km)">
            <input id="distance" name="distance" type="number" inputMode="decimal" min="0" step="any"
              value={form.distance} onChange={handleChange} placeholder="0" className={inputClass} />
          </Field>

          <Field id="elevation" label="Highest point (m)">
            <input id="elevation" name="elevation" type="number" inputMode="numeric" min="0"
              value={form.elevation} onChange={handleChange} placeholder="0" className={inputClass} />
          </Field>

          <Field id="days" label="Days">
            <input id="days" name="days" type="number" inputMode="numeric" min="0"
              value={form.days} onChange={handleChange} placeholder="0" className={inputClass} />
          </Field>
        </div>

        <label htmlFor="walked" className="flex items-center gap-4 text-base text-slate-200">
          <input
            id="walked"
            name="walked"
            type="checkbox"
            checked={form.walked}
            onChange={handleChange}
            className="h-5 w-5 accent-emerald-500"
          />
          I have walked this trail
        </label>

        <Field id="note" label="Note">
          <textarea id="note" name="note" rows={4} value={form.note} onChange={handleChange}
            placeholder="Weather, conditions, teahouses..." className={inputClass} />
        </Field>

        <button type="submit" className={`${ui.btnPrimary} w-full sm:w-auto sm:self-end`}>
          Add trail
        </button>
      </form>
    </div>
  )
}

export default LogTrailPage