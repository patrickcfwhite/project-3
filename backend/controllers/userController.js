const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')


function registerUser(req, res) {
  // Create our new user
  if (req.body.password === req.body.passwordConfirmation) {
    User
      .create(req.body)
      .then(user => {
        res.status(201).send(user)
      })
      .catch(error => res.send(error))
  } else {
    res.status(400).send({ message: 'passwords do not match' })
  }
}

function login(req, res) {
  //we try ro login with the email and the password
  User
    //find the user by using the email they've tried logging in with
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user.validatePassword(req.body.password)) {
        return res.status(401).send({ message: 'unauthorized' })
      }
      // at this point, we know the user is valid, we have their email,
      // and the password they're loggin in with matches the password
      // we've stored for them

      // Using jwt to create a token for me
      // ---
      // sub contains the user id
      // secret is a string we know
      // expiresIn says how long the token will be valid for
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' })
      res.status(202).send({ message: `Welcome back ${user.username}`, token })
    })

}

function displayUsers(req, res) {
  User
    .find()
    .then(users => {
      res.send(users)
    })
    .catch()
}

function singleUserId(req, res) {
  const id = req.params.id
  User
    .findById(id)
    .then(user => {
      res.send(user)
    })
    .catch(error => console.log(error))
}

function deleteUser(req, res) {
  const id = req.params.id
  User
    .findById(id)
    .then(user => {
      return user.remove()
    })
    .then(() => {
      res.status(204).send({ message: 'account deleted' })
    })
    .catch(error => console.log(error))
}

function addToUploads(req, res, item) {
  const userId = req.currentUser._id
  User
    .findById(userId)
    .then(user => {
      user.uploads.push(item)
      return user.save()
    })
    .then(user => {
      res.send({ user: user, upload: item })
    })
}

module.exports = {
  registerUser,
  login,
  displayUsers,
  singleUserId,
  deleteUser,
  addToUploads
}