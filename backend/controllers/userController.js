const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')
const mongoose = require('mongoose')



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

function addToFolder(req, res, item, folder) {

  const info = [item._id, item.category]
  const userId = req.currentUser._id
  User
    .findById(userId)
    .then(user => {
      user[folder].some(x => x['_id'] === item._id) ? user[folder] : user[folder].push(info)
      // for (const existing of user[folder]) {
      //   if (!item['_id'] === existing['_id']) {
      //     user[folder].push(item)
      return user.save()
    })
    .then(user => {
      res.send({ user: user, item: item })
    })
}

// function deleteFromUploads(req) {
//   const userId = req.currentUser._id
//   const idToDelete = req.params.id
//   User
//     .findById(userId)
//     .then(user => {
//       console.log(user.uploads)
//       console.log(userId)
//       console.log(idToDelete)
//       let index
//       for (const upload of user.uploads) {
//         if (upload['_id'] === idToDelete) {
//           index = user.uploads.indexOf(upload)
//         }
//         user.uploads.splice(index, 1)
//       }
//       return user.save()
//       // activityToDelete.remove()
//       // return user.save()
//     })
// }

function deleteFromFolder(req, user, folder) {
  //console.log(user, folder)
  const userId = user
  const idToDelete = req.params.activityId
  User
    .findById(userId)
    .then(user => {
      console.log(user)
      // let index
      for (const item of user[folder]) {
        console.log(item[0], idToDelete)
        if (item[0].toString() === idToDelete.toString()) {
          user[folder].pull(item)
          // index = user[folder].indexOf(item)
        }
        // console.log(folder, 'index = ', index)
        // console.log(folder, user[folder])
        // user[folder].splice(index, 1)
        console.log(folder, user[folder])
        return user.save()
      }
      
    })
    .catch(error => console.log(error))
}

// function editUpload(req, res) {

// }

module.exports = {
  registerUser,
  login,
  displayUsers,
  singleUserId,
  deleteUser,
  addToFolder,
  // deleteFromUploads,
  deleteFromFolder
}