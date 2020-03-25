const Read = require('../models/read')
const Cook = require('../models/cook')
const Play = require('../models/play')
const Watch = require('../models/watch')
const User = require('../models/user')
const mongoose = require('mongoose')
const userController = require('./userController')



//ACTIVITY

function all(req, res) {
  const category = req.params.category[0].toUpperCase() + req.params.category.slice(1)

  mongoose.model(category)
    .find()
    .then(items => {
      res.send(items)
    })
    .catch()
}

function singleItemName(req, res) {
  const category = req.params.category[0].toUpperCase() + req.params.category.slice(1)
  const title = req.params.title

  mongoose.model(category)
    .find({ 'title': title })
    .then(item => {
      res.send(item)
    })
    .catch(error => console.log(error))
}

function singleItemId(req, res) {
  console.log(req.params)
  const category = req.params.category[0].toUpperCase() + req.params.category.slice(1)
  const id = req.params.id
  
  mongoose.model(category)
    .findById(id)
    .then(item => {
      console.log(item)
      res.send(item)
    })
    .catch(error => console.log(error))
    
}

function addNewActivity(req, res) {
  const category = req.params.category[0].toUpperCase() + req.params.category.slice(1)
  req.body.user = req.currentUser
  mongoose.model(category)
    .create(req.body)
    .then(item => {
      userController.addToUploads(req, res, item)
    })
    .catch(error => console.log(error))
}

function editActivity(req, res) {
  const category = req.params.category[0].toUpperCase() + req.params.category.slice(1)
  const id = req.params.id
  mongoose.model(category)
    .findById(id)
    .then(item => {
      return item.set(req.body)
    })
    .then(item => {
      return item.save()
    })
    .then(item => {
      res.send(item)
    })
    .catch(error => console.log(error))

}

function deleteActivity(req, res) {
  const category = req.params.category[0].toUpperCase() + req.params.category.slice(1)
  const id = req.params.id
  mongoose.model(category)
    .findById(id)
    .then(item => {
      return item.remove()
    })
    .then(() => {
      res.status(204).send({ message: 'item deleted' })
    })
    .catch(error => console.log(error))
}

//COMMENTS

function addNewComment(req, res) {
  const category = req.params.category[0].toUpperCase() + req.params.category.slice(1)
  const id = req.params.id 
  mongoose.model(category)
    .findById(id)
    .then(item => {
      item.comments.push(req.body)
      return item.save()
    })
    .then(item => {
      res.send(item)
    })
    .catch(error => console.log(error))
}

function editComment(req, res) {
  const category = req.params.category[0].toUpperCase() + req.params.category.slice(1)
  const id = req.params.id
  const commentId = req.params.commentid
  mongoose.model(category)
    .findById(id)
    .then(item => {
      const commentToEdit = item.comments.id(commentId)
      commentToEdit.set(req.body)
      return item.save()
    })
    .then(item => res.send(item))
    .catch(error => console.log(error))
}

function deleteComment(req, res) {
  const category = req.params.category[0].toUpperCase() + req.params.category.slice(1)
  const id = req.params.id
  const commentId = req.params.commentid
  mongoose.model(category)
    .findById(id)
    .then(item => {
      const commentToDelete = item.comments.id(commentId)
      commentToDelete.remove()
      return item.save()
    })
    .then(() => res.send({ message: 'comment deleted' }))
    .catch(error => console.log(error))
}


module.exports = {
  all,
  singleItemName,
  singleItemId,
  addNewActivity,
  editActivity,
  deleteActivity,
  addNewComment,
  editComment,
  deleteComment
}