const Rate = require('@/models/Rate.model')
const factory = require('./factory')

const Model = Rate

exports.index = factory.getAll(Model)

exports.getOne = factory.getOne(Model)

exports.createOne = factory.createOne(Model)

exports.updateOne = factory.updateOne(Model)

exports.deleteOne = factory.deleteOne(Model)
