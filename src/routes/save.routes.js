const router = require("express").Router()
const saveController = require("@/controllers/save.controller")

router.route("/").get(saveController.index)
router.route("/").post(saveController.createOne)
router.route("/:id").get(saveController.getOne)
router.route("/:id").patch(saveController.updateOne)
router.route("/:id").delete(saveController.deleteOne)

module.exports = router