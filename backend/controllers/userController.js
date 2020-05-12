const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')



function registerUser(req, res) {
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
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user.validatePassword(req.body.password)) {
        return res.status(401).send({ message: 'unauthorized' })
      }
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' })
      res.status(202).send({ message: `Welcome back ${user.username}`, token })

    })
    .catch(error => console.log(error))
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
      console.log(user)
      res.send(user)
    })
    .catch(error => console.log(error))
}

function deleteUser(req, res) {
  const id = req.params.id
  User
    .findById(id)
    .then(user => {
      for (const follower of user.following) {
        const folder = 'followedBy'
        console.log('iterating ', follower)
        deleteFromFolder(req, follower, folder)
      }
      return user
    })
    .then(user => {
      return user.remove()
    })
    .then(() => {
      res.status(204).send({ message: 'account deleted' })
    })
    .catch(error => console.log(error))
}

function addToFolder(req, res, item, folder) {
  const info = folder === 'uploads' || folder === 'savedItems' ? [item._id, item.category] : [item._id]
  const userId = req.currentUser._id
  
  User
    .findById(userId)
    .then(user => {
      user[folder].some(x => x[0].toString() === item._id.toString()) ? console.log('already added to your folder') : user[folder].push(info)
      return user.save()
    })
    .then(user => {
      res.send({ user: user, item: item })
    })
}

function followUser(req, res) {

  const userId = req.params.id
  const currentUser = req.currentUser._id
  if (userId.toString() === currentUser.toString()) return
  User
    .findById(userId)
    .then(user => {
      addToFolder(req, res, user, 'following')
      user.followedBy.push([req.currentUser._id])
    })
    .catch(error => console.log(error))
}

function deleteFromFolder(req, user, folder) {
  //console.log(user, folder)
  const userId = user
  const idToDelete = req.params.activityId ? req.params.activityId : req.params.id
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
      }
      return user.save()
    })
    .catch(error => console.log(error))
}


function resetPassword(req, res) {
  console.log(req.body)
  if (req.body.email === '') {
    res.status(400).send('email required')
  }
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        console.error('email not in database')
        res.status(403).send('email not in db')
      } else {
        const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '1h' })
        console.log(token)
        user.resetPasswordToken = token


        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'patrickwhiteprojectthree@gmail.com',
            pass: 'Pr0ject3T3st'
          }
        })

        const mailOptions = {
          from: 'patrickwhiteprojectthree@gmail.com',
          to: `${user.email}`,
          subject: 'Link To Reset Password',
          text:
            `Dear ${user.firstname}, \n\n`
            + 'Please use the following link to reset your password for our website. \n\n'
            + `http://localhost:8000/reset/${token}/ \n\n`
            + 'If you did not request this, please ignore this email and your password will remain unchanged. \n'
        }

        console.log('sending mail')

        transporter.sendMail(mailOptions, (err, response) => {
          if (err) {
            console.error('there was an error: ', err)
          } else {
            console.log('here is the response:', response)
            res.status(200).send('recovery email sent')
          }
        })
        console.log(user)
        return user.save()
      }
    })
}

function checkResetToken(req, res) {
  console.log(req)
  const token = req.query.resetPasswordToken
  const decoded = jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return err.message
    }
    return decoded
  })
  console.log(decoded, req.params)
  User.findById(decoded.sub)
    .then(user => {
      if (decoded === 'jwt expired') {
        console.log('link has expired.')
        res.send({ message: 'link has expired.' })
      } else if (user === null) {
        console.log('user cannot be found')
      } else if (user.resetPasswordToken === 'x') {
        console.log('Link already used')
        console.log(user.resetPasswordToken)
        res.send({ message: 'link already used.' })
      } else {
        res.status(200).send({
          username: user.username,
          message: 'password reset link verified'
        })
      }
    })
    .catch(error => console.log(error))
}

function updatePassword(req, res) {
  //console.log(req)
  console.log(req.body)
  User.findOne({
    username: req.body.username
  })
    .then(user => {
      if (user === null) {
        console.log('no user exists in database')
        res.status(404).send({ message: 'no user exists in database' })
      } else {
        const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync())
        user.update({
          password: hashedPassword,
          resetPasswordToken: 'x'
        })
          .then(() => {
            console.log('password updated')
            res.status(200).send({ message: 'password updated' })
          })
      }
    })
}



module.exports = {
  registerUser,
  login,
  displayUsers,
  singleUserId,
  deleteUser,
  addToFolder,
  deleteFromFolder,
  followUser,
  resetPassword,
  checkResetToken,
  updatePassword
  // deleteFromUploads,
}


// function unfollowUser(req, res) {

//   const userId = req.params.id
//   const currentUser = req.currentUser._id
//   if (userId.toString() === currentUser.toString()) return
//   User
//     .findById(userId)
//     .then(user => {
//       deleteFromFolder(req, res, user, 'following')
//       user.followedBy.push([req.currentUser._id])
//     })
//     .catch(error => console.log(error))
// }

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