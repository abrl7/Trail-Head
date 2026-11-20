// src/seed.js
import { readFileSync } from 'node:fs'
import mongoose from 'mongoose'
import { connectDb } from './db.js'
import Trail from './models/Trail.js'

const seed = JSON.parse(readFileSync(new URL('./data/trails.json', import.meta.url), 'utf-8'))

await connectDb()
await Trail.deleteMany({})                       // dev only: wipes the collection first
await Trail.insertMany(seed.map(({ trailId, ...rest }) => rest))   // Mongo generates the _id
console.log(`Seeded ${seed.length} trails`)
await mongoose.disconnect()