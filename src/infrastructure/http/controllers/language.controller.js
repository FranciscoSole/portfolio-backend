/**
 * HTTP controller for working with languages. This controller receives
 * requests from the delivery mechanism, delegates business logic to the
 * injected use case and handles errors. It is part of the infrastructure
 * layer of the hexagonal architecture.
 */
class LanguageController {
  /**
   * @param {import('application/use-cases/get-languages.use-case').GetLanguagesUseCase} getLanguagesUseCase
   */
  constructor(getLanguagesUseCase) {
    this.getLanguagesUseCase = getLanguagesUseCase;
  }

  /**
   * Handle a GET /api/v1/languages request.
   *
   * @param {import('express').Request} _req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  getLanguages = async (_req, res, next) => {
    try {
      const result = await this.getLanguagesUseCase.execute();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = { LanguageController };