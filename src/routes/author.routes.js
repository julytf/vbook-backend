const router = require("express").Router()
const authorController = require("@/controllers/author.controller")

router.route("/").get(authorController.index)
router.route("/getAll").get(authorController.getAll)
router.route("/").post(authorController.createOne)
router.route("/:id").get(authorController.getOne)
router.route("/:id").patch(authorController.updateOne)
router.route("/:id").delete(authorController.deleteOne)

module.exports = router