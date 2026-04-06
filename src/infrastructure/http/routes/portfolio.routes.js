const { Router } = require('express');

/**
 * Build a router for portfolio endpoints. This function binds the
 * appropriate controller method to the route and returns the configured
 * router instance.
 *
 * @param {import('infrastructure/http/controllers/portfolio.controller').PortfolioController} portfolioController
 */
function buildPortfolioRouter(portfolioController) {
  const router = Router();
  // The controller method is an arrow function, so it captures the correct
  // `this` context automatically. No need for `.bind()` here.
  router.get('/api/v1/portfolio', portfolioController.getPortfolio);
  return router;
}

module.exports = { buildPortfolioRouter };