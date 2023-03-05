const { Schema, model } = require('mongoose')
const addressSchema = require('./schemas/address.schema')
// const orderDetailSchema = require('./schemas/orderDetail.schema')

const orderSchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  couponId: {
    type: Schema.ObjectId,
    ref: 'Coupon',
    required: true,
  },
  address: addressSchema,
  detail: [
    {
      bookId: {
        type: Schema.ObjectId,
        ref: 'Book',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 0,
        max: 99,
      },
    },
  ],
})

module.exports = model('Order', orderSchema)
