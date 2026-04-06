/**
 * Inbound port for the "get languages" use case.
 *
 * In hexagonal architecture, an inbound port defines the API exposed by
 * the application core. It hides the concrete implementation of the
 * use case behind an interface. Adapters (e.g. HTTP controllers) depend
 * on this interface rather than a concrete class, ensuring that the
 * business logic is decoupled from delivery mechanisms.
 */
class GetLanguagesPort {
  /**
   * Execute the use case and return a value object containing the list
   * of available languages.
   *
   * @returns {Promise<{ items: Array<{ code: string, language: string }> }>}
   */
  async execute() {
    throw new Error('Method not implemented');
  }
}

module.exports = { GetLanguagesPort };