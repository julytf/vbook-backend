require('dotenv').config({ path: './.env' })

const mongoose = require('mongoose')
const DB = require('./db')
const app = require('./app')

const port = process.env.PORT || 3000

let server

DB.connect()
  .then(() => DB.init())
  .then(() => {
    server = app.listen(port, () => {
      console.log(`App listening on port ${port}`)
    })
  })
