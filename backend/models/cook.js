const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true }
}, {
  timestamps: true // provide a createdAt field and an updatedAt field
})

const cookSchema = new mongoose.Schema({
<<<<<<< HEAD
  name: { type: String, required: true, unique: true },
=======
  // put unique true back on name
<<<<<<< HEAD
  name: { type: String, required: true },
>>>>>>> development
=======
  title: { type: String, required: true, unique: true },
>>>>>>> development
  ingredients: { type: Array, required: true },
  description: { type: String, required: true, maxlength: 1000 },
  image: { type: String, required: false },
  method: { type: Array, required: true },
  prepTime: { type: String, required: true },
  cookTime: { type: String, required: true },
  serves: { type: String, required: true },
  rating: { type: Number, required: true },
  category: { type: String, required: true },
  mealtype: { type: String, required: true },
  dietary: { type: Array, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [ commentSchema ]
})

module.exports = mongoose.model('Cook', cookSchema)