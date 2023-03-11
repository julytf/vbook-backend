const { Schema, model } = require('mongoose')

const bookImageSchema = new Schema({
  order: {
    type: Number,
    required: true,
  },
  bookId: {
    type: Schema.ObjectId,
    ref: 'Book',
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
})

const bookSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxLength: 200, 
  },
  language: {
    type: String,
    enum: ['VN', 'EN', 'CN', 'JP', 'KR'],
  },
  description: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: String,
    enum: ['AVAILABLE', 'HIDDEN', 'STOP_SELLING'],
    required: true,
    default: 'HIDDEN',
  },
  price: {
    type: Number,
    required: true,
  },
  discountPercent: {
    type: Number,
    default: 0,
  },
  rate: {
    type: Number,
    min: 0,
    max: 5,
  },
  translator: {
    type: String,
  },
  weight: {
    type: Number,
  },
  width: {
    type: Number,
  },
  height: {
    type: Number,
  },
  depth: {
    type: Number,
  },
  noPage: {
    type: Number,
  },
  form: {
    type: String,
    enum: ['HARD_COVER', 'PAPER_BACK'],
  },
  author: {
    type: Schema.ObjectId,
    ref: "Author"
  },
  publisher: {
    type: Schema.ObjectId,
    ref: "Publisher"
  },
  images: [bookImageSchema],
}, { timestamps: true })

module.exports = model('Book', bookSchema)
