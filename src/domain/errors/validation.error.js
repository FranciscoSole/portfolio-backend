const { AppError } = require('./app.error');

/**
 * Error thrown when input data fails validation.
 */
class ValidationError extends AppError {
  /**
   * @param {string} message
   */
  constructor(message) {
    super(message, 400);
  }
}

module.exports = { ValidationError };