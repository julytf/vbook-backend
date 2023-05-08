const router = require('express').Router()
const multer = require('multer')
const bookController = require('@/controllers/book.controller')
const AppError = require('@/utils/AppError')

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/assets/img/books')
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1]
    cb(null, `${Math.floor(Math.random() * 10e9)}.${ext}`)
  },
})

const multerFilter = (req, file, cb) => {
  return cb(null, true)
  if (file.mimetype?.startWith('image')) {
    return cb(null, true)
  }
  return cb(new AppError('file type not allowed!', 400), false)
}

const upload = multer({ storage: multerStorage, fileFilter: multerFilter })

const uploadImages = upload.array('images', 10)

router.route('/').get(bookController.index)
router.route('/get-all').get(bookController.getAll)
router.route('/').post(uploadImages, bookController.createOne)
router.route('/:id').get(bookController.getOne)
router.route('/:id').patch(uploadImages, bookController.updateOne)
router.route('/:id').delete(bookController.deleteOne)

module.exports = router
