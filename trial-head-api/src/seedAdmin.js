// src/seedAdmin.js
import mongoose from 'mongoose'
import { connectDb } from './db.js'
import User from './models/User.js'

const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env
if (!ADMIN_EMAIL || !ADMIN_PASSWORD || ADMIN_PASSWORD.length < 12) {
  console.error('Set ADMIN_EMAIL and an ADMIN_PASSWORD of at least 12 characters in .env')
  process.exit(1)
}

await connectDb()
const email = ADMIN_EMAIL.trim().toLowerCase()
await User.findOneAndUpdate(
  { email },
  { email, passwordHash: await User.hashPassword(ADMIN_PASSWORD), role: 'admin' },
  { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
)
console.log(`Admin ready: ${email}`)
await mongoose.disconnect()