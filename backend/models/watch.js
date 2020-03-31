const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true }
}, {
  timestamps: true // provide a createdAt field and an updatedAt field
})

const watchSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true, maxlength: 1000 },
  genre: { type: Array, required: true },
  image: { type: String, required: false },
  trailer: { type: String, required: false },
  director: { type: String, required: false },
  duration: { type: String, required: false },
  seasons: { type: String, required: false },
  rating: { type: Number, required: true },
  certification: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: false },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  savedBy: { type: Array, required: true },
  comments: [ commentSchema ]
})

module.exports = mongoose.model('Watch', watchSchema)