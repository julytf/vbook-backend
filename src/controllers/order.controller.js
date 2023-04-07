const Cart = require('@/models/Cart.model')
const Order = require('@/models/Order.model')
const catchPromise = require('@/utils/catchPromise')
const factory = require('./factory')

const Model = Order

exports.index = factory.getAllPaginate(Model)

exports.getAll = factory.getAll(Model)

exports.getOne = factory.getOne(Model)

// exports.createOne = factory.createOne(Model)

exports.updateOne = factory.updateOne(Model)

exports.deleteOne = factory.deleteOne(Model)

exports.buyOne = catchPromise(async function (req, res, next) {
  const order = new Order({
    user: req.user._id,
    details: [req.body],
    address: req.user.address,
  })
  await order.save()

  res.status(200).json({
    status: 'success',
    data: {
      doc: order
    }
  })
})

exports.buyFromCart = catchPromise(async function (req, res, next) {
  const cart = await Cart.findOne({ userId: req.user._id }).populate(
    'details.book'
  )

  const order = new Order({
    user: req.user._id,
    details: cart.details,
    address: req.user.address,
  })
  await order.save()

  cart.details = []
  await cart.save()

  res.status(200).json({
    status: 'success',
    data: {
      doc: order
    }
  })
})
