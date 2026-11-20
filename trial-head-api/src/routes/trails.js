// src/routes/trails.js
import { Router } from 'express'
import Trail from '../models/Trail.js'

const router = Router()

// The ONLY fields a client may set. Schema rules check values; this checks which fields.
const WRITABLE = ['trailName', 'region', 'difficulty', 'season', 'distance', 'elevation', 'days', 'walked', 'note']

const pick = (body) =>
  Object.fromEntries(WRITABLE.filter((k) => body?.[k] !== undefined).map((k) => [k, body[k]]))

// Runs for any route containing :id. A malformed id can never reach the database.
router.param('id', (req, res, next, id) => {
  if (!/^[a-f\d]{24}$/i.test(id)) return res.status(404).json({ error: 'Trail not found' })
  next()
})

router.get('/', async (req, res) => {
  const trails = await Trail.find().sort({ createdAt: 1 })
  res.json(trails)
})

router.get('/:id', async (req, res) => {
  const trail = await Trail.findById(req.params.id)
  if (!trail) return res.status(404).json({ error: 'Trail not found' })
  res.json(trail)
})

router.post('/', async (req, res) => {
  const trail = await Trail.create(pick(req.body))
  res.status(201).json(trail)
})

router.patch('/:id', async (req, res) => {
  const trail = await Trail.findByIdAndUpdate(req.params.id, pick(req.body), {
    new: true,             // return the updated document, not the old one
    runValidators: true,   // update queries skip schema validation unless you ask
  })
  if (!trail) return res.status(404).json({ error: 'Trail not found' })
  res.json(trail)
})

router.delete('/:id', async (req, res) => {
  const trail = await Trail.findByIdAndDelete(req.params.id)
  if (!trail) return res.status(404).json({ error: 'Trail not found' })
  res.status(204).end()
})

export default router