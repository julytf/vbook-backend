const Cart = require('@/models/Cart.model')
const Order = require('@/models/Order.model')
const catchPromise = require('@/utils/catchPromise')
const factory = require('./factory')
const { statusEnum: orderStatusEnum, paymentMethodEnum } = require('@/enums/Order')
const AppError = require('@/utils/AppError')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const Model = Order

exports.index = factory.getAllPaginate(Model)

exports.myOrders = catchPromise(async function (req, res, next) {
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
  const cart = await Cart.findOne({ user: req.user._id }).populate('details.book')
  const order = new Order({
    user: req.user._id,
    details: cart.details,
    address: req.body.address,
    note: req.body.note,
    paymentMethod: req.body.paymentMethod,
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

exports.getCheckoutSession = catchPromise(async function (req, res, next) {
  const order = await Order.findOne({ _id: req.params.orderId })

  if (!order) throw new AppError('No document found!', 404)

  // console.log(order.paymentMethod, paymentMethodEnum.CARD)
  if (order.paymentMethod !== paymentMethodEnum.CARD) throw new AppError('Error!', 400)
  // console.log('here')
  if (order.payment.paid) throw new AppError('Error!', 400)

  let paymentUrl = order.payment.url

  if (!paymentUrl) {
    session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      success_url: `${req.protocol}://${req.hostname}:${process.env.PORT}/orders/${order._id}/payment-success`,
      cancel_url: `${req.protocol}://${req.hostname}:${process.env.PORT}/orders/${order._id}/payment-fail`,
      customer_email: req.user.email,
      mode: 'payment',
      line_items: order.details.map((item) => ({
        price_data: {
          currency: 'vnd',
          unit_amount: item.book.price,
          product_data: {
            name: item.book.name,
            description: item.book.description.slice(0, 100) + '...',
            images: [item.book.images[0].file],
          },
        },
        quantity: item.quantity,
      })),
      orderId: order._id,
    })

    paymentUrl = session.url
    order.payment.id = session.id
    order.payment.url = session.url
    await order.save()
  }

  res.status(200).json({
    status: 'success',
    paymentUrl,
    test: { session },
  })
})

exports.checkPaymentStatus = catchPromise(async function (req, res, next) {
  const order = await Order.findOne({ _id: req.params.orderId })

  if (!order) throw new AppError('No document found!', 404)
  if (order.paymentMethod !== paymentMethodEnum.CARD) throw new AppError('Error!', 400)
  if (order.payment.paid) throw new AppError('Error!', 400)
})

exports.paymentSuccess = catchPromise(async function (req, res, next) {
  // const payload = req.body
  // const sig = req.headers['stripe-signature']

  // let event

  // try {
  //   event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
  // } catch (err) {
  //   return res.status(400).send(`Webhook Error: ${err.message}`)
  // }

  // if (event.type === 'checkout.session.completed') {
  //   const session = await stripe.checkout.sessions.retrieve(event.data.object.id, {
  //     expand: ['orderId'],
  //   })
  //   const order = await Order.findOne({ _id: session.orderId })
  //   order.payment.paid = true
  //   await order.save()
  // }
  const order = await Order.findOne({ _id: req.params.orderId })

  if (!order) throw new AppError('No document found!', 404)
  if (order.paymentMethod !== paymentMethodEnum.CARD) throw new AppError('Error!', 400)
  if (order.payment.paid) throw new AppError('Error!', 400)

  const paymentSession = await stripe.checkout.sessions.retrieve(order.payment.id)
  console.log(paymentSession)
  console.log(paymentSession.payment_status)

  if (paymentSession.payment_status == 'paid') {
    order.payment.paid = true
    await order.save()
  }

  res.status(200).json({
    status: 'success',
  })
})
