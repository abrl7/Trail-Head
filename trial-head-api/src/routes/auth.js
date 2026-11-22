// src/routes/auth.js
import { Router } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'

const router = Router()

// Used when the email doesn't exist, so the request still costs one bcrypt comparison
const DUMMY_HASH = bcrypt.hashSync('not-a-real-password', 12)

const regenerate = (req) =>
  new Promise((resolve, reject) => req.session.regenerate((e) => (e ? reject(e) : resolve())))
const destroy = (req) =>
  new Promise((resolve, reject) => req.session.destroy((e) => (e ? reject(e) : resolve())))

router.post('/login', async (req, res) => {
  // Only accept strings. Without this, {"email": {"$ne": null}} becomes a query operator.
  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : ''
  const password = typeof req.body?.password === 'string' ? req.body.password : ''
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  const user = await User.findOne({ email }).select('+passwordHash')
  const ok = await bcrypt.compare(password, user ? user.passwordHash : DUMMY_HASH)

  if (!user || !ok) {
    return res.status(401).json({ error: 'Invalid email or password' })
  }

  await regenerate(req)            // brand-new session id on login (prevents session fixation)
  req.session.userId = user.id     // the session stores only an id, never the user object
  res.json(user)
})

router.get('/me', async (req, res) => {
  const user = req.session.userId ? await User.findById(req.session.userId) : null
  if (!user) return res.status(401).json({ error: 'Not authenticated' })
  res.json(user)
})

router.post('/logout', async (req, res) => {
  await destroy(req)               // deletes the session on the server
  res.clearCookie('sid')
  res.status(204).end()
})

export default router