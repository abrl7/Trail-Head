// src/models/User.js
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

export const ROLES = ['viewer', 'admin']
const ROUNDS = 12   // cost factor: each +1 doubles the work

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    // select: false means queries leave the hash out unless you ask for it explicitly
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ROLES, default: 'viewer' },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
        delete ret.passwordHash     // second layer: it can never be serialised
        return ret
      },
    },
  }
)

userSchema.statics.hashPassword = (plain) => bcrypt.hash(plain, ROUNDS)

export default mongoose.model('User', userSchema)