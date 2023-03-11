const User = require('@/models/User.model')
const catchPromise = require('@/utils/catchPromise')
const factory = require('./factory')

const Model = User

exports.index = factory.getAll(Model)

exports.getOne = factory.getOne(Model)

exports.createOne = factory.createOne(Model)

exports.updateOne = factory.updateOne(Model)

exports.deleteOne = factory.deleteOne(Model)

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
      user
    },
  })
})

exports.deleteMe = catchPromise(async function (req, res, next) {
  const user = await User.findByIdAndUpdate(req.user._id, { status: 'INACTIVE'}, {
  })

  return res.status(204).send()
})
