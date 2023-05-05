const router = require("express").Router()
const bookController = require("@/controllers/book.controller")

router.route("/").get(bookController.index)
router.route("/get-all").get(bookController.getAll)
router.route("/").post(bookController.createOne)
router.route("/:id").get(bookController.getOne)
router.route("/:id").patch(bookController.updateOne)
router.route("/:id").delete(bookController.deleteOne)

module.exports = router