const Publisher = require('@/models/Publisher.model')
const factory = require('./factory')

const Model = Publisher

exports.index = factory.getAllPaginate(Model)

exports.getAll = factory.getAll(Model)

exports.getOne = factory.getOne(Model)

exports.createOne = factory.createOne(Model)

exports.updateOne = factory.updateOne(Model)

exports.deleteOne = factory.deleteOne(Model)
