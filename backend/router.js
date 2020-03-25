const router = require('express').Router()
const itemController = require('./controllers/itemController')

router.route('/:category')
  // get all books, add new book
  .get(itemController.all)
  .post(itemController.addNewActivity)


router.route('/:category/:id')
  .get(itemController.singleItemId)
  .put(itemController.editActivity)
  .delete(itemController.deleteActivity)
  // get a single book by name, & edit & delete the book 

// router.route('/:category/:title')
//   // get a single book by name, & edit & delete the book 
//   .get(itemController.singleItemName)

// router.route('/cook')
//   .get(itemController.all)

// router.route('/cook/:name')
//   .get(itemController.singleItem)

module.exports = router