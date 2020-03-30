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
      const folder = 'uploads'
      userController.addToFolder(req, res, item, folder)
    })
    .catch(error => console.log(error))
}

function addActivity(req, res) {
  console.log(req.params)
  const category = req.params.category[0].toUpperCase() + req.params.category.slice(1)
  req.body.user = req.currentUser
  const folder = !req.params.id ? 'uploads' : req.params.category !== 'user' ? 'savedItems' : 'following'
  console.log(req.params, folder)
  if (folder === 'uploads') {
    mongoose.model(category)
      .create(req.body)
      .then(item => {
        userController.addToFolder(req, res, item, folder)
      })
      .catch(error => console.log(error))
  } else {
    mongoose.model(category).findById(req.params.id)
      .then(item => {
        console.log('hello, ', item)
        const target = folder === 'savedItems' ? 'savedBy' : 'followedBy'
        userController.addToFolder(req, res, item, folder)
        item[target].some(x => x.toString() === req.currentUser._id.toString()) ? console.log('already added') : item[target].push([req.currentUser._id])
        return item.save()
      })
      .catch(error => console.log(error))
  }


}

function editActivity(req, res) {
  const category = req.params.category[0].toUpperCase() + req.params.category.slice(1)
  const id = req.params.id
  req.body.user = req.currentUser
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
  req.body.user = req.currentUser
  mongoose.model(category)
    .findById(id)
    .then(item => {
      return item.remove()
    })
    .then(() => {
      const folder = 'uploads'
      userController.deleteFromFolder(req, folder)
    })
    .then(() => res.send({ message: 'Item deleted' }))
    .catch(error => console.log(error))
}

function deleteActivity2(req, res) {
  const category = req.params.category[0].toUpperCase() + req.params.category.slice(1)
  const activityId = req.params.activityId
  req.body.user = req.currentUser
  let folder = req.params.folder
  const savedBy = []
  if (folder === 'uploads') {
    
    mongoose.model(category)
      .findById(activityId)
      .then(item => {
        console.log(item)
        savedBy.push(item.savedBy.flat(1))
        console.log(savedBy)
        userController.deleteFromFolder(req, req.currentUser._id, folder)
      
        return item
      })
      .then(item => {
        console.log(item)
        for (const user of savedBy) {
          folder = 'savedItems'
          console.log('iterating ', savedBy)
          userController.deleteFromFolder(req, user, folder)
        }
        return item
      })
      .then(item => item.remove())
      .then(() => res.send({ message: 'Item removed from database' }))
      .catch(error => console.log(error))
  } else if (folder === 'savedItems') {
    mongoose.model(category)
      .findById(activityId)
      .then(item => {
        for (const userId of item.savedBy) {
          let index
          if (userId.toString() === req.currentUser._id.toString()) {
            index = item.savedBy.indexOf(userId)
          }
          item.savedBy.splice(index, 1)
        }
        return item.save()
      })
      .then(() => {
        userController.deleteFromFolder(req, req.currentUser._id, 'savedItems')
      })
      .then(() => res.send({ message: 'Item removed from savedItems' }))
      .catch(error => console.log(error))
  } else if (folder === 'following') {
    mongoose.model(category)
      .findById(activityId)
      .then(item => {
        for (const userId of item.followedBy) {
          let index
          if (userId === req.currentUser._id) {
            index = item.followedBy.indexOf(userId)
          }
          item.followedBy.splice(index, 1)
        }
        return item.save()
      })
      .then(() => {
        userController.deleteFromFolder(req, req.currentUser._id, 'following')
      })
      .then(() => res.send({ message: 'user removed from following' }))
      .catch(error => console.log(error))
  } else {
    console.log('error')
  }


}

//COMMENTS

function addNewComment(req, res) {
  const category = req.params.category[0].toUpperCase() + req.params.category.slice(1)
  const id = req.params.id
  req.body.user = req.currentUser
  req.body.username = req.body.user.username
  console.log(req.body)
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
  singleItemId,
  addNewActivity,
  editActivity,
  deleteActivity,
  deleteActivity2,
  addNewComment,
  editComment,
  deleteComment,
  addActivity
}