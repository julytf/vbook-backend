const { Schema, model } = require('mongoose')

const publisherSchema = new Schema({
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
})

module.exports = model("Publisher", publisherSchema)