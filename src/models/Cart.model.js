const { Schema, model } = require('mongoose')

const cartDetailSchema = new Schema({
  book: {
    type: Schema.ObjectId,
    ref: 'Book',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    max: 99,
  },
})

const cartSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  details: [cartDetailSchema]
})

module.exports = model('Cart', cartSchema)
