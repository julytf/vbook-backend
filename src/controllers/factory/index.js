const AdjustQuery = require('@/utils/AdjustQuery')
const AppError = require('@/utils/AppError')
const catchPromise = require('@/utils/catchPromise')

exports.getOne = function (Model) {
  return catchPromise(async function (req, res, next) {
    const doc = await Model.findById(req.params.id)

    if (!doc) throw new AppError('No document found!', 404)

    return res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    })
  })
}
// TODO: filter, sort, limitfields, paginate
exports.getAll = function (Model) {
  return catchPromise(async function (req, res, next) {
    const { sort = false, page = 1, perPage = 12, q = '' } = req.query

    const query = new AdjustQuery(Model.find()).nameFilter(q).paginate(page, perPage).query
    // console.log(q)
    const docs = await query

    if (!docs) throw new AppError('No document found!', 404)

    // docs.forEach(doc => doc?.completeImagesUrl())

    const count = await new AdjustQuery(Model.find()).nameFilter(q).query.countDocuments()
    const noPage = Math.ceil(count / perPage)

    return res.status(200).json({
      status: 'success',
      result: docs.length,
      data: {
        docs,
        noPage,
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
        doc,
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
        doc,
      },
    })
  })
}

exports.deleteOne = function (Model) {
  return catchPromise(async function (req, res, next) {
    const rs = await Model.deleteOne({ id: req.params.id })

    if (!rs.deletedCount) throw new AppError('No document found!', 404)

    // const doc = await Model.findOne({ id: req.params.id })

    // if (!doc) throw new AppError('No document found!', 404)

    // doc.deletedAt = new Date()

    // await doc.save()

    return res.status(204).send()
  })
}
