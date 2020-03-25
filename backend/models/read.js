const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  description: { type: String, required: true, maxlength: 1000 },
  genre: { type: Array, required: true },
  bookType: { type: String, required: true }
})

module.exports = mongoose.model('Read', bookSchema)