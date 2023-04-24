const { genderEnum, statusEnum, roleEnum } = require('@/enums/User')
const { Schema, model } = require('mongoose')
const addressSchema = require('./schemas/address.schema')

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 6,
      maxLength: 50,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 255,
      select: false,
    },
    firstName: {
      type: String,
      required: true,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      maxLength: 50,
    },
    gender: {
      type: String,
      enum: genderEnum,
      required: true,
    },
    birthday: {
      type: Date,
    },
    phoneNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: statusEnum,
      default: statusEnum.ACTIVE,
    },
    role: {
      type: String,
      enum: roleEnum,
      default: roleEnum.USER,
    },
    address: addressSchema,
  },
  { timestamps: true }
)

module.exports = model('User', userSchema)
