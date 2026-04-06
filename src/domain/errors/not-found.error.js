const { AppError } = require('./app.error');

/**
 * Error thrown when a requested resource cannot be found.
 */
class NotFoundError extends AppError {
  /**
   * @param {string} message
   */
  constructor(message) {
    super(message, 404);
  }
}

module.exports = { NotFoundError };