const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')

//this will get run every time a user hits a private route
// Post, Put and Delete
function secureRoute(req, res, next) {
  // gets the token from our request header
  const authToken = req.headers.authorization

  if (!authToken || !authToken.startsWith('Bearer')) {
    // if we're in here, we know that theres' no valid token present
    return res.status(401).send({ message: 'Unauthorized' })

  }
  // At this point, we have the token, its not obviously wrng, but we need
  // to get with jwt if its valid properly
  const token = authToken.replace('Bearer ', '')
  //Verify our token, it's asynchronous, payload will have our token data
  jwt.verify(token, secret, (err, payload) => {
    if (err) return res.status(401).send({ message: 'Unauthorized' })
    User
      //payload.sub is just the userId we stored on the token
      .findById(payload.sub)
      .then(user => {
        // If there's no user. unauthorised
        if (!user) return res.status(401).send({ message: 'Unauthorized' })
        // We now have our user.
        // Attach our user to our request, so that our routes can access the user
        req.currentUser = user
        // Finish the middlewasre, let express know we're done
        next()
      })
      .catch(() => res.status(401).send({ message: 'Unauthorized' }))
  })
}

module.exports = secureRoute