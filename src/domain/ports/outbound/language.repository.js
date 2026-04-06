/**
 * Outbound port for language persistence.
 *
 * This port defines the operations that the domain layer expects for working
 * with language data. Concrete implementations live in the infrastructure
 * layer (e.g. MySQL). By depending on this interface instead of a
 * specific technology, the domain layer remains independent of the
 * persistence mechanism (Dependency Inversion principle).
 */
class LanguageRepositoryPort {
  /**
   * Return a list of active languages sorted alphabetically.
   *
   * @returns {Promise<Array<{code: string, language: string}>>}
   */
  async getActiveLanguages() {
    throw new Error('Method not implemented');
  }

  /**
   * Check whether an active language exists for the provided ISO code.
   *
   * @param {string} _code
   * @returns {Promise<boolean>}
   */
  async existsActiveByCode(_code) {
    throw new Error('Method not implemented');
  }
}

module.exports = { LanguageRepositoryPort };