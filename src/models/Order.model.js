const { Schema, model } = require('mongoose')
const addressSchema = require('./schemas/address.schema')
// const orderDetailSchema = require('./schemas/orderDetail.schema')

const orderDetailSchema = new Schema({
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

const orderSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    // total: {
    //   type: Number,
    //   required: true,
    // },
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', "REJECTED", 'SHIPPING', 'COMPLETED', 'CANCELED'],
      required: true,
      default: 'PENDING',
    },
    couponId: {
      type: Schema.ObjectId,
      ref: 'Coupon',
    },
    address: addressSchema,
    details: [orderDetailSchema],
  },
  { timestamps: true }
)

module.exports = model('Order', orderSchema)
