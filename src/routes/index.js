const router = require('express').Router()
const authorRouter = require('./author.routes')
const bookRouter = require('./book.routes')
const couponRouter = require('./coupon.routes')
const orderRouter = require('./order.routes')
const publisherRouter = require('./publisher.routes')
const rateRouter = require('./rate.routes')
const saveRouter = require('./save.routes')
const userRouter = require('./user.routes')

router.get('/', function (req, res, next) {
  res
    .status(200)
    .json({
      status: 'success',
      message: `welcome to ${process.env.APP_NAME} API!`,
    })
})
router.use('/authors', authorRouter)
router.use('/books', bookRouter)
router.use('/coupons', couponRouter)
router.use('/orders', orderRouter)
router.use('/publishers', publisherRouter)
router.use('/rates', rateRouter)
router.use('/saves', saveRouter)
router.use('/users', userRouter)

module.exports = router
