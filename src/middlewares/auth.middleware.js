const User = require('@/models/User.model')
const AppError = require('@/utils/AppError')
const jwt = require('jsonwebtoken')

async function auth(req, res, next) {
  const token = req.headers?.authorization?.replace('Bearer ', '') || req.cookies.jwt

  if (!token) return next(new AppError('Unauthorized!', 401))

  let decoded
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
  } catch (err) {
    return next(err)
  }
  const user = await User.findById(decoded._id).select('+password')
  console.log('auth', user._id)

  if (!user) return next(new AppError('Unauthorized!', 401))

  req.user = user

  return next()
}

module.exports = auth
