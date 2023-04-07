const User = require('@/models/User.model')
const catchPromise = require('@/utils/catchPromise')
const factory = require('./factory')

const Model = User

exports.index = factory.getAllPaginate(Model)

exports.getAll = factory.getAll(Model)

exports.getOne = factory.getOne(Model)

exports.createOne = factory.createOne(Model)

exports.updateOne = factory.updateOne(Model)

exports.deleteOne = factory.deleteOne(Model)

