// src/routes/trails.js
import { Router } from 'express'
import { readFileSync } from 'node:fs'

const router = Router()

// In-memory "database". It resets whenever the server restarts.
let trails = JSON.parse(
  readFileSync(new URL('../data/trails.json', import.meta.url), 'utf-8')
)

const REGIONS = ['Annapurna', 'Langtang', 'Khumbu', 'Manaslu']
const DIFFICULTIES = ['Easy', 'Moderate', 'Hard']
const SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter']

const isNonNegativeNumber = (v) => typeof v === 'number' && Number.isFinite(v) && v >= 0

// The ONLY fields a client may set, each with its own rule.
// '' is allowed for the dropdowns so the current React form keeps working.
const checks = {
  trailName: (v) => typeof v === 'string' && v.trim().length > 0,
  region: (v) => v === '' || REGIONS.includes(v),
  difficulty: (v) => v === '' || DIFFICULTIES.includes(v),
  season: (v) => v === '' || SEASONS.includes(v),
  distance: isNonNegativeNumber,
  elevation: isNonNegativeNumber,
  days: isNonNegativeNumber,
  walked: (v) => typeof v === 'boolean',
  note: (v) => typeof v === 'string',
}

const DEFAULTS = {
  region: '', difficulty: '', season: '',
  distance: 0, elevation: 0, days: 0,
  walked: false, note: '',
}

// Copies only whitelisted, valid fields out of the body
const parseBody = (body, { requireName }) => {
  const data = {}
  const errors = {}

  for (const field of Object.keys(checks)) {
    const value = body?.[field]
    if (value === undefined) continue
    if (checks[field](value)) data[field] = field === 'trailName' ? value.trim() : value
    else errors[field] = `Invalid value for ${field}`
  }

  if (requireName && data.trailName === undefined && !errors.trailName) {
    errors.trailName = 'trailName is required'
  }
  return { data, errors }
}

// The server owns IDs. This logic used to live in your React provider.
const nextId = () => {
  const max = trails.reduce(
    (m, t) => Math.max(m, parseInt(t.trailId.split('-')[1], 10)),
    0
  )
  return `tr-${String(max + 1).padStart(3, '0')}`
}

router.get('/', (req, res) => {
  res.json(trails)
})

router.get('/:id', (req, res) => {
  const trail = trails.find((t) => t.trailId === req.params.id)
  if (!trail) return res.status(404).json({ error: 'Trail not found' })
  res.json(trail)
})

router.post('/', (req, res) => {
  const { data, errors } = parseBody(req.body, { requireName: true })
  if (Object.keys(errors).length > 0) return res.status(400).json({ errors })

  const trail = { trailId: nextId(), ...DEFAULTS, ...data }
  trails.push(trail)
  res.status(201).json(trail)
})

router.patch('/:id', (req, res) => {
  const index = trails.findIndex((t) => t.trailId === req.params.id)
  if (index === -1) return res.status(404).json({ error: 'Trail not found' })

  const { data, errors } = parseBody(req.body, { requireName: false })
  if (Object.keys(errors).length > 0) return res.status(400).json({ errors })

  trails[index] = { ...trails[index], ...data }
  res.json(trails[index])
})

router.delete('/:id', (req, res) => {
  const exists = trails.some((t) => t.trailId === req.params.id)
  if (!exists) return res.status(404).json({ error: 'Trail not found' })

  trails = trails.filter((t) => t.trailId !== req.params.id)
  res.status(204).end()
})

export default router