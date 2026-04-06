/**
 * Express middleware used as a catch-all for unknown routes. Responds with
 * a 404 status code and a descriptive message containing the original
 * requested URL.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} _next
 */
function notFoundHandler(req, res, _next) {
  res.status(404).json({
    message: `Route '${req.originalUrl}' not found`
  });
}

module.exports = { notFoundHandler };