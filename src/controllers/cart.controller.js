const Cart = require('@/models/Cart.model')
const User = require('@/models/User.model')
const AppError = require('@/utils/AppError')
const catchPromise = require('@/utils/catchPromise')
const jwt = require('jsonwebtoken')

exports.getCart = catchPromise(async function (req, res, next) {
  const cart = await Cart.findOne({ user: req.user._id }).populate('details.book')
  const cartDetails = cart?.details || []
  // console.log(req.user._id)

  return res.status(200).json({
    status: 'success',
    result: cartDetails.length,
    data: {
      cart: cartDetails,
      test: cart,
    },
  })
})

exports.addItem = catchPromise(async function (req, res, next) {
  let cart = await Cart.findOne({ user: req.user._id }).populate('details.book')
  if (!cart) {
    cart = new Cart({
      user: req.user._id,
      details: [],
    })
  }
  const index = cart.details.findIndex((item) => item.book._id === req.body.cartItem.book)

  if (index != -1) {
    throw new AppError('Duplicate item found!', 400)
  }

  cart.details.push(req.body.cartItem)
  await cart.save()

  return res.status(200).json({
    status: 'success',
    result: cart.details.length,
    data: {},
  })
})

exports.updateItem = catchPromise(async function (req, res, next) {
  let cart = await Cart.findOne({ user: req.user._id }).populate('details.book')
  if (!cart) {
    throw new AppError('No document found!', 404)
  }
  const index = cart.details.findIndex((item) => item.book._id == req.body.cartItem.book)
  // console.log(req.body.cartItem, cart.details[0], index);
  if (index == -1) {
    throw new AppError('No item found!', 404)
  }

  cart.details[index].quantity = req.body.cartItem.quantity
  await cart.save()

  return res.status(200).json({
    status: 'success',
    result: cart.details.length,
    data: {},
  })
})

exports.deleteItem = catchPromise(async function (req, res, next) {
  let cart = await Cart.findOne({ user: req.user._id }).populate('details.book')
  if (!cart) {
    throw new AppError('No document found!', 404)
  }
  const index = cart.findIndex((item) => item.book._id === req.body.bookId)

  if (index == -1) {
    throw new AppError('No item found!', 404)
  }

  cart.splice(index, 1)
  await cart.save()
  return res.status(200).json({
    status: 'success',
    result: cart.details.length,
    data: {},
  })
})

exports.updateCart = catchPromise(async function (req, res, next) {
  let cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    { details: req.body.cart },
    {
      new: true,
      runValidators: true,
    }
  ).populate('details.book')
  if (!cart) {
    cart = new Cart({
      user: req.user._id,
      details: req.body.cart,
    })
  }
  await cart.save()
  return res.status(200).json({
    status: 'success',
    result: cart.details.length,
    data: {},
  })
})

exports.deleteCart = catchPromise(async function (req, res, next) {
  await Cart.findOneAndUpdate({ user: req.user._id }, { details: [] })
  return res.status(204).send()
})
