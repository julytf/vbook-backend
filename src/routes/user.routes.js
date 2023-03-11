const router = require("express").Router()
const userController = require("@/controllers/user.controller")
const auth = require("@/middlewares/auth.middleware")

router.route("/").get(userController.index)

router.use(auth)

router.route("/me").get(userController.getMe)
router.route("/me").patch(userController.updateMe)
router.route("/me").delete(userController.deleteMe)

module.exports = router