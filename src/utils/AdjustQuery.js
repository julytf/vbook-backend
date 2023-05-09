class AdjustQuery {
  constructor(query) {
    this.query = query
  }
  nameFilter(name) {
    this.query.find({ name: { $regex: name, $options: 'i' } })
    return this
  }
  paginate(page = 1, perPage = 10) {
    let skip = (page - 1) * perPage
    this.query.skip(skip).limit(perPage)
    return this
  }
  sort(cri) {
    this.query.sort(cri)
    return this
  }
}

module.exports = AdjustQuery
