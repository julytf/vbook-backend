const { Schema, model } = require('mongoose')

const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    max: 500,
  },
  image: {
    type: String,
  },
})

module.exports = model('Author', authorSchema)
