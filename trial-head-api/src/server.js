// src/server.js
import app from './app.js'
import { connectDb } from './db.js'

const PORT = process.env.PORT || 3000

try {
  await connectDb()
  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`))
} catch (err) {
  console.error('Failed to start:', err.message)
  process.exit(1)
}


