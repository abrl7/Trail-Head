// src/app.js: builds the app
import express from 'express'
import trailsRouter from './routes/trails.js'

const app = express()

app.use(express.json())                       // 1. parse JSON bodies into req.body

app.get('/api/health', (req, res) => res.json({ ok: true }))
app.use('/api/trails', trailsRouter)          // 2. mount the trails routes

app.use((req, res) => {                       // 3. nothing matched
  res.status(404).json({ error: 'Not found' })
})

app.use((err, req, res, next) => {            // 4. error handler: four parameters
  console.error(err)
  res.status(500).json({ error: 'Something went wrong' })
})

export default app