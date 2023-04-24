const Save = require('@/models/Save.model')
const factory = require('./factory')
const catchPromise = require('@/utils/catchPromise')

const Model = Save

exports.index = catchPromise(async (req, res) => {
  const userId = req.user._id

  let saves = await Save.find({ user: userId }).populate('book')
  const books = saves.map((save) => save.book)

  return res.status(200).json({
    status: 'success',
    result: saves.length,
    data: {
      docs: books,
    },
  })
})
// exports.getOne = factory.getOne(Model)

// exports.createOne = factory.createOne(Model)

// exports.updateOne = factory.updateOne(Model)

// exports.deleteOne = factory.deleteOne(Model)

exports.check = catchPromise(async (req, res) => {
  const userId = req.user._id || req.params.userId
  const bookId = req.params.bookId

  let save = await Save.findOne({ user: userId, book: bookId })

  const isSaved = !!save

  return res.status(200).json({
    status: 'success',
    data: {
      isSaved,
    },
  })
})

exports.save = catchPromise(async (req, res) => {
  const userId = req.user._id || req.params.userId
  const bookId = req.params.bookId

  let save = await Save.findOne({ user: userId, book: bookId })

  if (!save) {
    save = new Save({ user: userId, book: bookId })
  }
  // console.log(save)
  save.save()

  return res.status(200).json({
    status: 'success',
  })
})

exports.unsave = catchPromise(async (req, res) => {
  const userId = req.user._id || req.params.userId
  const bookId = req.params.bookId

  let save = await Save.findOneAndDelete({ user: userId, book: bookId })

  return res.status(200).json({
    status: 'success',
  })
})
