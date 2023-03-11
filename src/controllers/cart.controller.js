const Cart = require('@/models/Cart.model')
const User = require('@/models/User.model')
const AppError = require('@/utils/AppError')
const catchPromise = require('@/utils/catchPromise')
const jwt = require('jsonwebtoken')

exports.getCart = catchPromise(async function (req, res, next) {
  const cart = await Cart.findOne({ userId: req.user._id })
  const cartDetails = cart?.details || []
  return res.status(201).json({
    status: 'success',
    result: cartDetails.length,
    data: {
      cart: cartDetails,
    },
  })
})

exports.updateCart = catchPromise(async function (req, res, next) {
  // console.log(req.body.cartDetails);
  let cart = await Cart.findOneAndUpdate(
    { userId: req.user._id },
    { details: req.body.cartDetails },
    {
      new: true,
      runValidators: true,
    }
  )
  if (!cart) {
    cart = new Cart({
      userId: req.user._id,
      details: req.body.cartDetails,
    })
  }
  await cart.save()
  return res.status(200).json({
    status: 'success',
    result: cart.details.length,
    data: {
      cart: cart.details,
    },
  })
})

exports.deleteCart = catchPromise(async function (req, res, next) {
  await Cart.findOneAndUpdate({ userId: req.user._id }, { details: [] })
  return res.status(204).send()
})
