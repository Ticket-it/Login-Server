/**
 * Middle ware for error handling
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function errorHandler(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      error: {
        status: err.status || 500,
        message: err.message,
      },
    });
  }
  
  module.exports = errorHandler;
  