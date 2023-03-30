const router = require('express').Router()
const userController = require('@/controllers/user.controller')
const auth = require('@/middlewares/auth.middleware')

router.route('/').get(userController.index)

module.exports = router
