function errorHandler(err, req, res, next) { 
    // TODO:
    res.status(err.errorCode || 500).send(err)
    console.log('❗ ' + err)
}

module.exports = errorHandler