const { Router } = require('express');

/**
 * Build a router for language endpoints. The router delegates request
 * handling to the provided controller which should implement the
 * necessary methods for the HTTP verbs exposed.
 *
 * @param {import('infrastructure/http/controllers/language.controller').LanguageController} languageController
 */
function buildLanguageRouter(languageController) {
  const router = Router();
  // Map the GET request to the controller method. Note that the controller
  // method is defined as an arrow function so the correct `this` context
  // is preserved without the need for `.bind()`.
  router.get('/api/v1/languages', languageController.getLanguages);
  return router;
}

module.exports = { buildLanguageRouter };