const AppError = require('@/utils/AppError')

const router = require('express').Router()

router.get('/', function (req, res, next) {
  res.status(200).json({
    status: 'success',
    message: `welcome to ${process.env.APP_NAME} API!`,
  })
})

router.use('/auth', require('./auth.routes'))
router.use('/authors', require('./author.routes'))
router.use('/books', require('./book.routes'))
router.use('/cart', require('./cart.routes'))
router.use('/coupons', require('./coupon.routes'))
router.use('/orders', require('./order.routes'))
router.use('/publishers', require('./publisher.routes'))
router.use('/rates', require('./rate.routes'))
router.use('/saves', require('./save.routes'))
router.use('/users', require('./user.routes'))

router.all('*', (req, res, next) => {
  return next(new AppError(`Can't find this route in this server!`, 404))
})

module.exports = router
