// src/app.js: builds the app
import express from 'express'
import trailsRouter from './routes/trails.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import authRouter from './routes/auth.js'

const app = express()

app.use(express.json())                       // 1. parse JSON bodies into req.body

const isProd = process.env.NODE_ENV === 'production'
if (!process.env.SESSION_SECRET) throw new Error('SESSION_SECRET is not set')
if (isProd) app.set('trust proxy', 1)   // behind a reverse proxy, so `secure` cookies work

app.use(
  session({
    name: 'sid',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,   // no cookie until someone actually logs in
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI, ttl: 60 * 60 * 8 }),
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: isProd,
      maxAge: 1000 * 60 * 60 * 8,   // 8 hours
    },
  })
)

// Responses that belong to one person must never be cached or shared
const noStore = (req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
}

app.use('/api/auth', noStore, authRouter)

app.get('/api/health', (req, res) => res.json({ ok: true }))
app.use('/api/trails', trailsRouter)          // 2. mount the trails routes

app.use((req, res) => {                       // 3. nothing matched
  res.status(404).json({ error: 'Not found' })
})

app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const errors = Object.fromEntries(
      Object.entries(err.errors).map(([field, e]) => [field, e.message])
    )
    return res.status(400).json({ errors })
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ errors: { [err.path]: `Invalid value for ${err.path}` } })
  }
  console.error(err)
  res.status(500).json({ error: 'Something went wrong' })
})

export default app