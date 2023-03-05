const { Schema, model } = require('mongoose')

const rateSchema = new Schema({
  userId: {
    required: true,
    type: Schema.ObjectId,
    ref: "User"
  },
  bookId: {
    required: true,
    type: Schema.ObjectId,
    ref: "Book"
  },
  value: {
    required: true,
    type: Number,
    min: 0,
    max: 5,
  },
  comment: {
    type: String,
  },
})

rateSchema.index({ userId: 1, bookId: 1})

module.exports = model("Rate", rateSchema)