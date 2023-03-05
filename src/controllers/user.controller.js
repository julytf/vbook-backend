const User = require('@/models/User.model')
const factory = require('./factory')

const Model = User

exports.index = factory.getAll(Model)

exports.getOne = factory.getOne(Model)

exports.createOne = factory.createOne(Model)

exports.updateOne = factory.updateOne(Model)

exports.deleteOne = factory.deleteOne(Model)
