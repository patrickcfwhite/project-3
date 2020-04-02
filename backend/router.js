const router = require('express').Router()
const itemController = require('./controllers/itemController')
const userController = require('./controllers/userController')
const secureRoute = require('./lib/secureRoute')

router.route('/register')
  .post(userController.registerUser)

router.route('/login')
  .post(userController.login)

router.route('/forgotPassword')
  .post(userController.resetPassword)

router.route('/reset/')
  .get(userController.checkResetToken)
  
router.route('/updatePassword')
  .put(userController.updatePassword)

router.route('/user')
  .get(userController.displayUsers)

router.route('/user/:id')
  .delete(secureRoute, userController.deleteUser)
  .get(userController.singleUserId)

router.route('/user/:id/:folder/:category/:activityId')
  .delete(secureRoute, itemController.deleteActivity2)

router.route('/:category/:id')
  .get(itemController.singleItemId)
  .put(secureRoute, itemController.editActivity)
  .post(secureRoute, itemController.addActivity)
  // .delete(secureRoute, itemController.deleteActivity)


router.route('/:category')
  // get all books, add new book
  .get(itemController.all)
  .post(secureRoute, itemController.addActivity)


router.route('/:category/:id/comments')
  .post(secureRoute, itemController.addNewComment)

router.route('/:category/:id/comments/:commentid')
  .put(secureRoute, itemController.editComment)
  .delete(secureRoute, itemController.deleteComment)









// get a single book by name, & edit & delete the book 

// router.route('/:category/:title')
//   // get a single book by name, & edit & delete the book 
//   .get(itemController.singleItemName)

// router.route('/cook')
//   .get(itemController.all)

// router.route('/cook/:name')
//   .get(itemController.singleItem)

module.exports = router



// http://localhost:8001/api/user/5e7e1c8eae9cb347da6be033/savedItems/read/5e7e1c8eae9cb347da6be034