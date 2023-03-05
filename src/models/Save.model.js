const { Schema, model } = require('mongoose')

const saveSchema = new Schema({
  userId: {
    required: true,
    type: Schema.ObjectId,
    ref: "User",
    index: true
  },
  bookId: {
    required: true,
    type: Schema.ObjectId,
    ref: "Book"
  },
})

module.exports = model("Save", saveSchema)