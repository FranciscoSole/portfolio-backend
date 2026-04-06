// Import domain errors and ports. By referencing the domain directly, the
// application layer remains decoupled from any legacy shared or adapter
// structures.
const { NotFoundError } = require('domain/errors/not-found.error');
const { ValidationError } = require('domain/errors/validation.error');
const { GetPortfolioPort } = require('domain/ports/inbound/get-portfolio.port');


/**
 * Application service (use case) for retrieving a portfolio in a given
 * language. Implements the inbound port that defines the expected
 * interface for this operation. It validates the input, checks that
 * the requested language exists and delegates data retrieval to the
 * outbound ports. The raw result sets are then mapped into domain
 * entities via the injected mapper.
 */
class GetPortfolioUseCase extends GetPortfolioPort {
  /**
   * The use case depends on two outbound ports for reading language and
   * portfolio data, as well as a mapper component. All dependencies are
   * expressed as domain interfaces or infrastructure utilities to
   * preserve the hexagonal boundaries.
   *
   * @param {import('domain/ports/outbound/language.repository').LanguageRepositoryPort} languageRepository
   * @param {import('domain/ports/outbound/portfolio.repository').PortfolioRepositoryPort} portfolioRepository
   * @param {import('infrastructure/mysql/portfolio-mapper').PortfolioMapper} portfolioMapper
   */
  constructor(languageRepository, portfolioRepository, portfolioMapper) {
    super();
    this.languageRepository = languageRepository;
    this.portfolioRepository = portfolioRepository;
    this.portfolioMapper = portfolioMapper;
  }

  /**
   * {@inheritdoc}
   */
  async execute(languageCode) {
    const normalizedLanguageCode = String(languageCode).trim().toUpperCase();

    if (!normalizedLanguageCode) {
      throw new ValidationError("Query param 'lang' is required");
    }
    if (normalizedLanguageCode.length !== 3) {
      throw new ValidationError(
        "Query param 'lang' must contain 3 characters (ISO 4217)"
      );
    }
    const exists = await this.languageRepository.existsActiveByCode(
      normalizedLanguageCode
    );
    if (!exists) {
      throw new NotFoundError(
        `Language '${normalizedLanguageCode}' is not active or does not exist`
      );
    }
    // Use the normalized code when querying persistence.
    const data = await this.portfolioRepository.getPortfolioDataByLanguageCode(
      normalizedLanguageCode
    );
    // Convert the raw result sets into domain entities.
    return this.portfolioMapper.toDomain(data);
  }
}

module.exports = { GetPortfolioUseCase };
