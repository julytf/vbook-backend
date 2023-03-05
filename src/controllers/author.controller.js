const Author = require('@/models/Author.model.js')
const factory = require('./factory')

const Model = Author

exports.index = factory.getAll(Model)

exports.getOne = factory.getOne(Model)

exports.createOne = factory.createOne(Model)

exports.updateOne = factory.updateOne(Model)

exports.deleteOne = factory.deleteOne(Model)