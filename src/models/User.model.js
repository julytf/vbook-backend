const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  firstName: {
    required: true,
    type: String,
    maxLength: 50,
  },
  lastName: {
    required: true,
    type: String,
    maxLength: 50,
  },
  gender: {
    type: Boolean,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'DEACTIVE', 'BANNED'],
    default: 'ACTIVE',
  },
  role: {
    type: String,
  },
})

module.exports = model('User', userSchema)
