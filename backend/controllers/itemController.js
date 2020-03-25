const router = require('express').Router()
const Read = require('../models/read')
const Cook = require('../models/cook')
const Play = require('../models/play')
const Watch = require('../models/watch')
const mongoose = require('mongoose')


// get all items in category
function all(req, res) {
  const category = req.params.category[0].toUpperCase() + req.params.category.slice(1)

  mongoose.model(category)
    .find()
    .then(items => {
      res.send(items)
    })
    .catch()
}


// get one in a category
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
  mongoose.model(category)
    .create(req.body)
    .then(item => {
      res.send(item)
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

module.exports = {
  all,
  singleItemName,
  singleItemId,
  addNewActivity,
  editActivity,
  deleteActivity
}