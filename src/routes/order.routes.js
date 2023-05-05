const router = require("express").Router({ mergeParams: true })
const orderController = require("@/controllers/order.controller")
const auth = require("@/middlewares/auth.middleware")

router.use(auth)

router.route("/").get(orderController.index)
router.route("/my-orders").get(orderController.myOrders)
router.route("/get-all").get(orderController.getAll)

router.route("/buy-one").post(auth, orderController.buyOne)
router.route("/buy-from-cart").post(auth, orderController.buyFromCart)

// router.route("/").post(orderController.createOne)
router.route("/:id").get(orderController.getOne)
router.route("/:id").patch(orderController.updateOne)
router.route("/:id").delete(orderController.deleteOne)
router.route("/:orderId/cancel-order").get(orderController.cancelOrder)

module.exports = router