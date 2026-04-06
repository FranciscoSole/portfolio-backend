/**
 * HTTP controller for retrieving portfolio data. Part of the infrastructure
 * layer; it translates HTTP requests into use case invocations and
 * handles the resulting responses or errors.
 */
class PortfolioController {
  /**
   * @param {import('application/use-cases/get-portfolio.use-case').GetPortfolioUseCase} getPortfolioUseCase
   */
  constructor(getPortfolioUseCase) {
    this.getPortfolioUseCase = getPortfolioUseCase;
  }

  /**
   * Handle a GET /api/v1/portfolio request.
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  getPortfolio = async (req, res, next) => {
    try {
      const lang = String(req.query.lang);
      const result = await this.getPortfolioUseCase.execute(lang);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = { PortfolioController };