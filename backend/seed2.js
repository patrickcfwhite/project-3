const mongoose = require('mongoose')
const Read = require('./models/read')
const Cook = require('./models/cook')
const Watch = require('./models/watch')
const Play = require('./models/play')
const User = require('./models/user')
const { dbURI } = require('./config/environment')
const seedFunction = require('./lib/seedFunction')

mongoose.connect(
  `${dbURI}`,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (error, db) => {
    if (error) {
      return console.log(error)
    }
    console.log('Ready to seed database!')
    db.dropDatabase()
      .then(() => {
        return User.create(
          [
            {
              username: 'patrick',
              email: 'patrick@patrick.com',
              password: 'patrick',
              passwordConfirmation: 'patrick',
              firstname: 'Patrick',
              uploads: [],
              savedItems: [],
              following: [],
              followedBy: [],
              resetPasswordToken: ''

            },
            {
              username: 'annie',
              email: 'annie@annie.com',
              password: 'annie',
              passwordConfirmation: 'annie',
              firstname: 'Annie',
              uploads: [],
              savedItems: [],
              following: [],
              followedBy: [],
              resetPasswordToken: ''

            },
            {
              username: 'kenn',
              email: 'kenn@kenn.com',
              password: 'kenn',
              passwordConfirmation: 'kenn',
              firstname: 'Kenn',
              uploads: [],
              savedItems: [],
              following: [],
              followedBy: [],
              resetPasswordToken: ''

            }
          ])

      })
      .then((users) => {
        console.log(users)
        seedFunction.createBooks(users)
        return users
      }).then(users => {
        console.log('recipes', users)
        seedFunction.createRecipes(users)
        return users
      }).then(users => {
        console.log('watch', users)
        seedFunction.createWatch(users)
        return users
      }).then(users => {
        console.log('play', users)
        seedFunction.createPlay(users)
        return users
        // Promise.all([p1, p2, p3, p4]).then(() => {

        // })

      })
      .finally((users) => {
        console.log(users)
        setTimeout(() => {
          mongoose.connection.close()
        }, 5000)
        
      })
  })

