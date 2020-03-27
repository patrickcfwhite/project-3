const router = require('express').Router()
const itemController = require('./controllers/itemController')
const userController = require('./controllers/userController')
const secureRoute = require('./lib/secureRoute')

router.route('/register')
  .post(userController.registerUser)

router.route('/login')
  .post(userController.login)

router.route('/user')
  .get(userController.displayUsers)

router.route('/user/:id')
  .delete(userController.deleteUser)

router.route('/:category')
  // get all books, add new book
  .get(itemController.all)
  .post(secureRoute, itemController.addNewActivity)


router.route('/:category/:id')
  .get(itemController.singleItemId)
  .put(itemController.editActivity)
  .delete(itemController.deleteActivity)

router.route('/:category/:id/comments')
  .post(secureRoute,itemController.addNewComment)

router.route('/:category/:id/comments/:commentid')
  .put(itemController.editComment)
  .delete(itemController.deleteComment)






// get a single book by name, & edit & delete the book 

// router.route('/:category/:title')
//   // get a single book by name, & edit & delete the book 
//   .get(itemController.singleItemName)

// router.route('/cook')
//   .get(itemController.all)

// router.route('/cook/:name')
//   .get(itemController.singleItem)

module.exports = router