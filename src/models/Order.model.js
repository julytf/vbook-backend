const { Schema, model } = require('mongoose')
const addressSchema = require('./schemas/address.schema')
const { statusEnum } = require('@/enums/Order')
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
      enum: statusEnum,
      required: true,
      default: statusEnum.PENDING,
    },
    couponId: {
      type: Schema.ObjectId,
      ref: 'Coupon',
    },
    address: addressSchema,
    details: [orderDetailSchema],
    note: {
      type: String,
      maxLength: 500,
    }
  },
  { timestamps: true }
)

orderSchema.pre(/^find/, function() {
  this.populate('details.book')
})

module.exports = model('Order', orderSchema)
