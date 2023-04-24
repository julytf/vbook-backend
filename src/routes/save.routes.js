const router = require('express').Router({ mergeParams: true })
const saveController = require('@/controllers/save.controller')
const auth = require('@/middlewares/auth.middleware')

router.use(auth)

router.route('/').get(saveController.index)
// router.route("/").post(saveController.createOne)
// router.route("/:id").get(saveController.getOne)
// router.route("/:id").patch(saveController.updateOne)
// router.route("/:id").delete(saveController.deleteOne)

router.route('/:bookId').get(saveController.check)
router.route('/:bookId/save').get(saveController.save)
router.route('/:bookId/unsave').get(saveController.unsave)

module.exports = router
