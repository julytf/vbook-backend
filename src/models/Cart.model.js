const { Schema, model } = require('mongoose')

const cartDetailSchema = new Schema({
  bookId: {
    type: Schema.ObjectId,
    required: true,
    ref: 'Book',
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
    max: 99,
  },
})

const cartSchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    required: true,
    ref: 'User',
    index: true,
  },
  details: [cartDetailSchema]
})

module.exports = model('Cart', cartSchema)
