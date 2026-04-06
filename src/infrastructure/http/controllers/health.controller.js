/**
 * Simple controller exposing a health check endpoint. The controller
 * intentionally has no dependencies because it performs no business
 * logic. It is part of the infrastructure layer and serves as a
 * translation layer between HTTP and the application core.
 */
class HealthController {
  /**
   * Handle a GET /health request.
   *
   * @param {import('express').Request} _req
   * @param {import('express').Response} res
   */
  getHealth(_req, res) {
    res.status(200).json({ status: 'ok' });
  }
}

module.exports = { HealthController };