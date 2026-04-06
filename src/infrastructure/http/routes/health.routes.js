const { Router } = require('express');

/**
 * Build a router for health endpoints. The router is constructed from
 * outside the controller to keep responsibilities separated and to
 * facilitate unit testing of the controller. The function takes in a
 * controller instance and binds the appropriate methods to the
 * endpoint paths.
 *
 * @param {import('infrastructure/http/controllers/health.controller').HealthController} healthController
 */
function buildHealthRouter(healthController) {
  const router = Router();
  router.get('/health', healthController.getHealth.bind(healthController));
  return router;
}

module.exports = { buildHealthRouter };