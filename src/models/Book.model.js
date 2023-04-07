const { Schema, model } = require('mongoose')

const {languageEnum, statusEnum, formEnum} = require('@/enums/Book')

const bookImageSchema = new Schema({
  order: {
    type: Number,
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
    enum: languageEnum,
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
    enum: statusEnum,
    required: true,
    default: statusEnum.HIDDEN,
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
    enum: formEnum,
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

// bookSchema.method('completeImagesUrl', function (host) {
//   this.images.map(image => `${host}${image}`)
// })

bookSchema.pre(/^find/, function () {
  this.populate(['author','publisher'])
})

module.exports = model('Book', bookSchema)
