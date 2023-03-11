const { Schema, model } = require('mongoose')

const couponSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  discountPercent: {
    type: Number,
    require: true,
    min: 0,
    max: 100,
  },
  date: {
    type: Date,
    default: () => new Date(Date.now() + 7*24*60*60*1000)
  },
}, { timestamps: true })

module.exports = model('Coupon', couponSchema)
