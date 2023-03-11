const { Schema, model } = require('mongoose')

const rateSchema = new Schema({
  user: {
    required: true,
    type: Schema.ObjectId,
    ref: "User"
  },
  book: {
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
}, { timestamps: true })

rateSchema.index({ user: 1, book: 1})

module.exports = model("Rate", rateSchema)