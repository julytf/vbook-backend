const AdjustQuery = require('@/utils/AdjustQuery')
const catchPromise = require('@/utils/catchPromise')

exports.getOne = function (Model) {
  return catchPromise(async function (req, res, next) {
    const doc = await Model.findById(req.params.id)

    if (!doc) throw new AppError('No document found!', 404)

    return res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    })
  })
}
// TODO: filter, sort, limitfields, paginate
exports.getAll = function (Model) {
  return catchPromise(async function (req, res, next) {
    const { sort = false, page = 1, perPage = 10} = req.query

    const docs = await new AdjustQuery(Model.find()).paginate(page, perPage).query

    if (!docs) throw new AppError('No document found!', 404)

    return res.status(200).json({
      status: 'success',
      result: docs.length,
      data: {
        data: docs,
      },
    })
  })
}

exports.createOne = function (Model) {
  return catchPromise(async function (req, res, next) {
    const doc = await Model.create(req.body)

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    })
  })
}

exports.updateOne = function (Model) {
  return catchPromise(async function (req, res, next) {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!doc) throw new AppError('No document found!', 404)

    return res.status(200).json({
      status: 'success',
      result: doc.length,
      data: {
        data: doc,
      },
    })
  })
}

exports.deleteOne = function (Model) {
  return catchPromise(async function (req, res, next) {
    const rs = await Model.deleteOne({ id: req.params.id })

    if (!rs.deletedCount) throw new AppError('No document found!', 404)

    return res.status(204).send()
  })
}
