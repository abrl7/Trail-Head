// src/models/Trail.js
import mongoose from 'mongoose'

export const REGIONS = ['Annapurna', 'Langtang', 'Khumbu', 'Manaslu']
export const DIFFICULTIES = ['Easy', 'Moderate', 'Hard']
export const SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter']

const trailSchema = new mongoose.Schema(
  {
    trailName: { type: String, required: [true, 'Trail name is required'], trim: true, maxlength: 100 },
    // '' stays allowed so the current form, which has an empty first option, keeps working
    region: { type: String, enum: { values: ['', ...REGIONS], message: 'Unknown region' }, default: '' },
    difficulty: { type: String, enum: { values: ['', ...DIFFICULTIES], message: 'Unknown difficulty' }, default: '' },
    season: { type: String, enum: { values: ['', ...SEASONS], message: 'Unknown season' }, default: '' },
    distance: { type: Number, min: [0, 'Distance cannot be negative'], default: 0 },
    elevation: { type: Number, min: [0, 'Elevation cannot be negative'], default: 0 },
    days: { type: Number, min: [0, 'Days cannot be negative'], default: 0 },
    walked: { type: Boolean, default: false },
    note: { type: String, default: '', maxlength: 2000 },
  },
  {
    timestamps: true,   // adds createdAt and updatedAt automatically
    toJSON: {
      // Shapes what res.json() sends, so React keeps receiving `trailId`
      transform: (doc, ret) => {
        ret.trailId = ret._id.toString()
        delete ret._id
        delete ret.__v
        return ret
      },
    },
  }
)

export default mongoose.model('Trail', trailSchema)