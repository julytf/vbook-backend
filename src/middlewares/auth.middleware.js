const User = require("@/models/User.model");
const AppError = require("@/utils/AppError");
const jwt = require('jsonwebtoken')

async function auth(req, res, next) {
    if(!req.cookies.jwt) return next(new AppError('Unauthorized!', 401))

    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded._id)
    
    if(!user) return next(new AppError('Unauthorized!', 401))

    req.user = user

    return next()
}

module.exports = auth