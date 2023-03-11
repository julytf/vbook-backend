const User = require('@/models/User.model')
const AppError = require('@/utils/AppError')
const catchPromise = require('@/utils/catchPromise')
const jwt = require('jsonwebtoken')

exports.register = catchPromise(async function (req, res, next) {
  await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
  })

  return res.status(201).json({
    status: 'success',
  })
})

exports.login = catchPromise(async function (req, res, next) {
  const user = await User.findOne({ username: req.body.username })

  if (!user) return next(new AppError('No document found!', 404))

  if (req.body.password !== user.password)
    return next(new AppError('Unauthorized!', 401))

  const token = jwt.sign(
    { 
      _id: user._id, 
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  )

  return res.status(200).cookie('jwt', token).json({
    status: 'success',
    data: {
      user,
    },
  })
})
