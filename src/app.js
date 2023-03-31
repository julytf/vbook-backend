require('module-alias/register')
const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
var cors = require('cors')
const router = require('@/routes')
const errorHandler = require('@/utils/errorHandler')
const app = express()

// app middlewares
app.use(morgan('dev'))

app.use(cors())
app.use(cookieParser())
app.use(express.json())
// app.use(express.json({ limit: '10kb' }))
// app.use(express.urlencoded({ extended: true, limit: '10kb' }))

app.use(express.static(`${__dirname}/../public`))

// test
// app.use('/test', function (req, res, next) {
//   throw new Error('test error')
//   res.send('test')
// })

// router
app.use(router)

// app error handler
app.use(errorHandler)

module.exports = app
