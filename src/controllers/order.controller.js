const Cart = require('@/models/Cart.model')
const Order = require('@/models/Order.model')
const catchPromise = require('@/utils/catchPromise')
const factory = require('./factory')
const { statusEnum: orderStatusEnum } = require('@/enums/Order')
const AppError = require('@/utils/AppError')

const Model = Order

exports.index = catchPromise(async function (req, res, next) {
  const userId = req.params.userId || req.user._id

  const orders = await Order.find({ user: userId }).populate(['details.book'])

  res.status(200).json({
    status: 'success',
    data: {
      docs: orders,
    },
  })
})

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
      doc: order,
    },
  })
})

exports.buyFromCart = catchPromise(async function (req, res, next) {
  console.log('here')
  const cart = await Cart.findOne({ user: req.user._id }).populate('details.book')
  const order = new Order({
    user: req.user._id,
    details: cart.details,
    address: req.body.address,
    note: req.body.note,
  })
  await order.save()

  cart.details = []
  await cart.save()

  res.status(200).json({
    status: 'success',
    data: {
      doc: order,
    },
  })
})

exports.cancelOrder = catchPromise(async function (req, res, next) {
  const order = await Order.findOne({ user: req.user._id, _id: req.params.orderId })
  // console.log(req.user._id, req.params.orderId);

  console.log(order.status, orderStatusEnum.PENDING, order.status != orderStatusEnum.PENDING)
  if (!order) throw new AppError('No document found!', 404)
  if (order.status != orderStatusEnum.PENDING) throw new AppError('Error!', 400)

  order.status = orderStatusEnum.CANCELED

  await order.save()

  res.status(200).json({
    status: 'success',
    data: {},
  })
})
