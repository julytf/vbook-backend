const router = require("express").Router()
const couponController = require("@/controllers/coupon.controller")

router.route("/").get(couponController.index)
router.route("/getAll").get(couponController.getAll)
router.route("/").post(couponController.createOne)
router.route("/:id").get(couponController.getOne)
router.route("/:id").patch(couponController.updateOne)
router.route("/:id").delete(couponController.deleteOne)

module.exports = router