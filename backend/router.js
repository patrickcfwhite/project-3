const router = require('express').Router()
const itemController = require('./controllers/itemController')

router.route('/read')
  // get all books, add new book
  .get(itemController.all)

router.route('/read/:name')
  // get a single book by name, & edit & delete the book 
  .get(itemController.singleItem)

router.route('/cook')
  .get(itemController.all)

router.route('/cook/:name')
  .get(itemController.singleItem)

module.exports = router