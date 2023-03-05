function errorHandler(err, req, res, next) { 
    // TODO:
    res.send(err)
    console.log(err)
}

module.exports = errorHandler