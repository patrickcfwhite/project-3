// Your backend starts here..
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const router = require('./router')
const path = require('path')
const dist = path.join(__dirname, 'dist')
const { port, dbURI } = require('./config/environment')

const expressServer = express()

mongoose.connect(
  dbURI,
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

expressServer.use('/', express.static(dist))

expressServer.get('*', function(req, res) {
  res.sendFile(path.join(dist, 'index.html'))
})

expressServer.listen(port)

module.exports = expressServer