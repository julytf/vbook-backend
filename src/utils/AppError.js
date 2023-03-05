class AppError extends Error {
  constructor(message, errorCode) {
    super(message)

    this.errorCode = errorCode
    this.status = `${errorCode}`.startsWith('4') ? 'fail' : 'error'
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = AppError