const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true }
}, {
  timestamps: true // provide a createdAt field and an updatedAt field
})

const playSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true, maxlength: 2000 },
  image: { type: String, required: false },
  genre: { type: Array, required: true },
  rating: { type: Number, required: true },
  subcategory: { type: String, required: true },
  players: { type: String, required: true },
  format: { type: String, required: false },
  duration: { type: String, required: false },
  category: { type: String, required: true },
  link: { type: String, required: false },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  savedBy: { type: Array, required: true },
  comments: [ commentSchema ]
  
})


// playSchema.plugin(mongooseHidden,  { hidden: { password: true } })

module.exports = mongoose.model('Play', playSchema)