const router = require('express').Router()
const authController = require('@/controllers/auth.controller')
const auth = require('@/middlewares/auth.middleware')

router.route('/register').post(authController.register)
router.route('/login').post(authController.login)
// TODO: logout???
router.route('/logout').post(authController.logout)

router.use(auth)

router.route('/me').get(authController.getMe)
router.route('/me').patch(authController.updateMe)
router.route('/me').delete(authController.deleteMe)

module.exports = router
