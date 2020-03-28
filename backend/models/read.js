const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  rating: { type: Number, required: true }
}, {
  timestamps: true // provide a createdAt field and an updatedAt field
})


const readSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  description: { type: String, required: true, maxlength: 2000 },
  genre: { type: Array, required: true },
  bookType: { type: String, required: true },
  image: { type: String, required: false },
  rating: { type: Number, required: true },
  category: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [ commentSchema ],
  savedBy: { type: Array, required: true }

})



module.exports = mongoose.model('Read', readSchema)