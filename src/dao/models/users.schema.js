import mongoose from 'mongoose'

export const usersSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  age: { type: Number, required: true },
  rol: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { versionKey: false })

