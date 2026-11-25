// src/middleware/auth.js
import User from '../models/User.js'

export const requireAuth = async (req, res, next) => {
  const userId = req.session.userId
  const user = userId ? await User.findById(userId) : null

  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' })
  }
  req.user = user      // later middleware and handlers read this
  next()
}

export const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Forbidden' })
  }
  next()
}