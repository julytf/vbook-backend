const router = require('express').Router()
const userController = require('@/controllers/user.controller')
const saveController = require('@/controllers/save.controller')
const auth = require('@/middlewares/auth.middleware')

router.route('/').get(userController.index)
router.route('/get_all').get(userController.getAll)
router.route("/").post(userController.createOne)
router.route('/:id').get(userController.getOne)
router.route('/:id').patch(userController.updateOne)
router.route('/:id').delete(userController.deleteOne)


// TODO: middleware admin
router.use('/:userId/saves', require('./save.routes'))
router.use('/:userId/orders', require('./order.routes'))

module.exports = router
