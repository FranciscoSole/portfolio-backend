const cors = require('cors');
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const { GetLanguagesUseCase } = require('application/use-cases/get-languages.use-case');
const { GetPortfolioUseCase } = require('application/use-cases/get-portfolio.use-case');
const { dbPool } = require('infrastructure/config/database');
// Outbound adapters
const { MySqlLanguageRepository } = require('infrastructure/mysql/mysql-language.repository');
const { MySqlPortfolioRepository } = require('infrastructure/mysql/mysql-portfolio.repository');
const { PortfolioMapper } = require('infrastructure/mysql/portfolio-mapper');
// Inbound adapters
const { HealthController } = require('infrastructure/http/controllers/health.controller');
const { LanguageController } = require('infrastructure/http/controllers/language.controller');
const { PortfolioController } = require('infrastructure/http/controllers/portfolio.controller');
const { errorHandler } = require('infrastructure/http/middlewares/error-handler.middleware');
const { notFoundHandler } = require('infrastructure/http/middlewares/not-found.middleware');
const { buildHealthRouter } = require('infrastructure/http/routes/health.routes');
const { buildLanguageRouter } = require('infrastructure/http/routes/language.routes');
const { buildPortfolioRouter } = require('infrastructure/http/routes/portfolio.routes');

function buildApp() {
  // Instantiate outbound adapters with the DB pool
  const languageRepository = new MySqlLanguageRepository(dbPool);
  const portfolioRepository = new MySqlPortfolioRepository(dbPool);
  const portfolioMapper = new PortfolioMapper();

  // Application services (use cases)
  const getLanguagesUseCase = new GetLanguagesUseCase(languageRepository);
  const getPortfolioUseCase = new GetPortfolioUseCase(
    languageRepository,
    portfolioRepository,
    portfolioMapper
  );

  // Inbound controllers
  const healthController = new HealthController();
  const languageController = new LanguageController(getLanguagesUseCase);
  const portfolioController = new PortfolioController(getPortfolioUseCase);

  const app = express();

  // Global middleware
  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  // Routes
  app.use(buildHealthRouter(healthController));
  app.use(buildLanguageRouter(languageController));
  app.use(buildPortfolioRouter(portfolioController));

  // Error handlers
  app.use(notFoundHandler);
  app.use(errorHandler);

  const publicDir = path.join(__dirname, '..', 'public');
  app.use(express.static(publicDir));
  app.get('*', (req, res) => res.sendFile(path.join(publicDir, 'index.html')));

  return app;
}

module.exports = { buildApp };
