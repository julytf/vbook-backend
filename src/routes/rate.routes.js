const router = require("express").Router()
const rateController = require("@/controllers/rate.controller")

router.route("/").get(rateController.index)
router.route("/get-all").get(rateController.getAll)
router.route("/").post(rateController.createOne)
router.route("/:id").get(rateController.getOne)
router.route("/:id").patch(rateController.updateOne)
router.route("/:id").delete(rateController.deleteOne)

module.exports = router