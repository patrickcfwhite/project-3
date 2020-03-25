const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const router = require('./router')

const expressServer = express()

mongoose.connect(
  'mongodb://localhost/activity-db',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (error) => {
    if (error) console.log(error)
    else console.log('Connected to Mongoose!')
  })

expressServer.use(bodyParser.json())

expressServer.use((req, res, next) => {
  console.log(`Incoming ${req.method} to ${req.url}`)
  next()
})

expressServer.use('/api', router )

expressServer.listen(8001)