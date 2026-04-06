// The application layer depends only on abstractions from the domain.
// Use configured aliases to import from the domain layer. See package.json scripts
// where NODE_PATH is set to `./src` to resolve these module names.
const { GetLanguagesPort } = require('domain/ports/inbound/get-languages.port');
const { Language } = require('domain/entities/language.entity');

/**
 * Application service (use case) for retrieving active languages. This class
 * implements the inbound port defined for this use case and depends only on
 * the outbound port for language persistence. The transformation of raw
 * persistence results into domain entities is performed here, keeping the
 * domain decoupled from the infrastructure.
 */
class GetLanguagesUseCase extends GetLanguagesPort {
  /**
   * The use case depends on an implementation of the language repository
   * outbound port. By typing against the interface from the domain, the
   * application layer remains agnostic of the underlying persistence
   * mechanism.
   *
   * @param {import('domain/ports/outbound/language.repository').LanguageRepositoryPort} languageRepository
   */
  constructor(languageRepository) {
    super();
    this.languageRepository = languageRepository;
  }

  /**
   * Execute the use case and return a value object containing domain
   * language entities. Validation is not required for this use case.
   *
   * @returns {Promise<{ items: Array<Language> }>}
   */
  async execute() {
    const rows = await this.languageRepository.getActiveLanguages();
    const items = rows.map((row) => new Language({ code: row.code, language: row.language }));
    return { items };
  }
}

module.exports = { GetLanguagesUseCase };
