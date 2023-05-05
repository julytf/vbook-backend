const router = require("express").Router()
const publisherController = require("@/controllers/publisher.controller")

router.route("/").get(publisherController.index)
router.route("/get-all").get(publisherController.getAll)
router.route("/").post(publisherController.createOne)
router.route("/:id").get(publisherController.getOne)
router.route("/:id").patch(publisherController.updateOne)
router.route("/:id").delete(publisherController.deleteOne)

module.exports = router