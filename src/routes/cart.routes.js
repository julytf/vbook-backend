const router = require("express").Router()
const cartController = require("@/controllers/cart.controller")
const auth = require("@/middlewares/auth.middleware")

router.use(auth)

router.route("/").get(cartController.getCart)
router.route("/").patch(cartController.updateCart)
router.route("/").delete(cartController.deleteCart)
router.route("/items").post(cartController.addItem)
router.route("/items").patch(cartController.updateItem)
router.route("/items").delete(cartController.deleteItem)

module.exports = router
