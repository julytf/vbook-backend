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
  const user = await User.findOne({ username: req.body.username }).select('+password')

  if (!user) return next(new AppError('No document found!', 404))

  if (req.body.password !== user.password)
    return next(new AppError('Unauthorized!', 401))

  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: `${process.env.JWT_EXPIRES_IN}d`,
    }
  )

  return res
    .status(200)
    .cookie('jwt', token, {
      expires: new Date(Date.now() + 1000*60*60*24*process.env.JWT_EXPIRES_IN),
    })
    .json({
      status: 'success',
      token,
      data: {
        user,
      },
    })
})

exports.logout = catchPromise(async function (req, res, next) {
  return res.status(200).clearCookie('jwt').json({
    status: 'success',
  })
})

exports.getMe = catchPromise(async function (req, res, next) {
  return res.status(200).json({
    status: 'success',
    data: {
      user: req.user,
    },
  })
})

exports.updateMe = catchPromise(async function (req, res, next) {
  const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })

  return res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  })
})

exports.deleteMe = catchPromise(async function (req, res, next) {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { status: 'INACTIVE' },
    {}
  )

  return res.status(204).send()
})
