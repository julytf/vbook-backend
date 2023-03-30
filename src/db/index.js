require('module-alias/register')
const mongoose = require('mongoose')

mongoose.set('strictQuery', true)

const DB_string = process.env.MONGO_STRING.replace(
  '<username>',
  process.env.MONGO_USERNAME
)
  .replace('<password>', process.env.MONGO_PASSWORD)
  .replace('<database>', process.env.MONGO_DATABASE)
exports.connect = () =>
  mongoose
    .connect(DB_string, {})
    .then(() => console.log('DB connect successful'))

exports.init = () =>
  Promise.all([
    require('@/models/Author.model').init(),
    require('@/models/Book.model').init(),
    require('@/models/Cart.model').init(),
    require('@/models/Coupon.model').init(),
    require('@/models/Order.model').init(),
    require('@/models/Publisher.model').init(),
    require('@/models/Rate.model').init(),
    require('@/models/Save.model').init(),
    require('@/models/User.model').init(),
  ]).then(() => console.log('DB init successful'))
  
exports.drop = () =>
  Promise.all([
    require('@/models/Author.model').deleteMany({}),
    require('@/models/Book.model').deleteMany({}),
    require('@/models/Cart.model').deleteMany({}),
    require('@/models/Coupon.model').deleteMany({}),
    require('@/models/Order.model').deleteMany({}),
    require('@/models/Publisher.model').deleteMany({}),
    require('@/models/Rate.model').deleteMany({}),
    require('@/models/Save.model').deleteMany({}),
    require('@/models/User.model').deleteMany({}),
  ]).then(() => console.log('DB drop successful'))
