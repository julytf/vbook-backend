const { Schema, model } = require('mongoose')

const addressSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 50,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
    maxLength: 2,
  },
  provine: {
    type: String,
    required: true,
    maxLength: 3,
  },
  district: {
    type: String,
    required: true,
    maxLength: 5,
  },
  address: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
  },
})

module.exports = addressSchema
