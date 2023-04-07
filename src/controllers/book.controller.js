const Book = require('@/models/Book.model.js')
const factory = require('./factory')

const Model = Book

exports.index = factory.getAllPaginate(Model)

exports.getAll = factory.getAll(Model)

exports.getOne = factory.getOne(Model)

exports.createOne = factory.createOne(Model)

exports.updateOne = factory.updateOne(Model)

exports.deleteOne = factory.deleteOne(Model)