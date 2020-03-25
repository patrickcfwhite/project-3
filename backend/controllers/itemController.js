const router = require('express').Router()
const Read = require('../models/read')
const Cook = require('../models/cook')
const mongoose = require('mongoose')


// get all items in category
function all(req, res) {
  const url = req.headers.referer.split('/')[3]
  const modelNeeded = url[0].toUpperCase() + url.slice(1)
  console.log(modelNeeded)
  mongoose.model(modelNeeded)
    .find()
    .then(items => {
      res.send(items)
    })
    .catch()
}

// function allCook(req, res) {
//   Cook
//     .find()
//     .then(items => {
//       res.send(items)
//     })
// }

// get one in a category
function singleItem(req, res) {
  const name = req.params.name
  const url = req.headers.referer.split('/')[4]
  url
    .find({ 'name': name })
    .then(item => {
      res.send(item)
    })
    .catch(error => console.log(error))
}

module.exports = {
  all,
  singleItem
}