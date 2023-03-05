const { Schema, model } = require('mongoose')

const authorSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  description: {
    type: String,
    max: 500
  },
  image: {
    type: String,
  },
})

module.exports = model("Author", authorSchema)