const { AppError } = require('domain/errors/app.error');

/**
 * Express error handling middleware. Converts domain errors into HTTP
 * responses and hides implementation details from the client. For
 * unexpected errors, it logs the error and returns a 500 status.
 *
 * @param {any} error
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} _next
 */
function errorHandler(error, req, res, _next) {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      message: error.message,
      path: req.originalUrl
    });
    return;
  }
  console.error(error);
  res.status(500).json({
    message: 'Internal server error',
    path: req.originalUrl
  });
}

module.exports = { errorHandler };