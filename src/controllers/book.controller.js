const Book = require('@/models/Book.model.js')
const factory = require('./factory')
const catchPromise = require('@/utils/catchPromise')
const fs = require('fs')

const Model = Book

exports.index = factory.getAllPaginate(Model)

exports.getAll = factory.getAll(Model)

exports.getOne = factory.getOne(Model)

exports.createOne = catchPromise(async function (req, res, next) {
  const book = await Book.create(req.body)

  if (req.files.length > 0) {
    book.images.forEach((image) => fs.unlink(image.file, () => {}))
    book.images = req.files.map((file, i) => ({ order: i + 1, file: file.path }))
    await book.save()
  }

  res.status(201).json({
    status: 'success',
    data: {
      doc: book,
    },
  })
})

exports.updateOne = catchPromise(async function (req, res, next) {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  // console.log(req.files)

  if (!book) throw new AppError('No document found!', 404)

  if (req.files.length > 0) {
    book.images.forEach((image) => fs.unlink(image.file, () => {}))
    book.images = req.files.map((file, i) => ({ order: i + 1, file: file.path }))
    await book.save()
  }

  return res.status(200).json({
    status: 'success',
    data: {
      doc: book,
    },
  })
})

exports.deleteOne = factory.deleteOne(Model)
