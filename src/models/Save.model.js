const { Schema, model } = require('mongoose')

const saveSchema = new Schema({
  user: {
    required: true,
    type: Schema.ObjectId,
    ref: "User",
    index: true
  },
  book: {
    required: true,
    type: Schema.ObjectId,
    ref: "Book"
  },
})

module.exports = model("Save", saveSchema)