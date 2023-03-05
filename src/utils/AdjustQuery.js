class AdjustQuery {
  constructor(query) {
    this.query = query
  }
  paginate(page = 1, perPage = 10) {
    let skip = (page - 1) * perPage
    this.query.skip(skip).limit(perPage)
    return this
  }
}

module.exports = AdjustQuery