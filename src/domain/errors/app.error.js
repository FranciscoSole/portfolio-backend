/**
 * Base class for domain-specific errors. Extends the built-in Error
 * and accepts an HTTP status code for downstream translation in
 * infrastructure layers.
 */
class AppError extends Error {
  /**
   * @param {string} message
   * @param {number} statusCode
   */
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

module.exports = { AppError };