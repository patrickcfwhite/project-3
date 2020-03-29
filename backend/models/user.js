const mongoose = require('mongoose')
let mongooseHidden = require('mongoose-hidden')()

const bcrypt = require('bcrypt')

const schema = new mongoose.Schema({

  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, minLength: 8, unique: true },
  password: { type: String, required: true, hide: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: false },
  interests: { type: Array, required: false, maxItems: 10 },
  uploads: { type: Array, required: true },
  savedItems: { type: Array, required: true },
  //following: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }
  following: { type: Array, required: true },
  image: { type: String , required: false }

})

schema.plugin(require('mongoose-unique-validator'))
schema.plugin(mongooseHidden,  { hidden: { password: true } })
// Remove certain fields from our user response
// userSchema.set('toJSON', {
//   transform(doc, json)
// })

schema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    // _ is a convention, it means a temporary field
    this._passwordConfirmation = passwordConfirmation
  })

schema
  .pre('validate', function checkPassword(next) {
    if (this.isModified('password') && this._passwordConfirmation !== this.password) {
      this.invalidate('passwordConfirmation', 'should match')
    }
    next()
  })


//PRe lets you tap into the schema lifecycle
schema
  .pre('save', function hashPassword(next) {
    if (this.isModified('password')) { // If the password has been created or changed
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync()) //encrypt the password
    }
    next() //tells mongoose we're done
  })


// Method to check if the password user tries to login with is the same
// as the one we've encrypted
schema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', schema)