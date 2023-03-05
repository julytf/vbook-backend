const { Schema, model } = require('mongoose')

const addressSchema = new Schema({
  city: {
    required: true,
    type: String,
  },
  provine: {
    required: true,
    type: String,
  },
  district: {
    required: true,
    type: String,
  },
  address: {
    required: true,
    type: String,
  },
  address2: {
    type: String,
  },
})

module.exports = addressSchema
