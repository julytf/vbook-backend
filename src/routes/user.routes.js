const router = require('express').Router()
const userController = require('@/controllers/user.controller')
const saveController = require('@/controllers/save.controller')
const auth = require('@/middlewares/auth.middleware')

router.route('/').get(userController.index)
router.route('/get_all').get(userController.getAll)
router.route('/:id').get(userController.getOne)
router.route('/:id').patch(userController.updateOne)
router.route('/:id').delete(userController.deleteOne)

router.use('/:userId/saves', require('./save.routes'))

module.exports = router
