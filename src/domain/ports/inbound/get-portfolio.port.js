/**
 * Inbound port for the "get portfolio" use case.
 *
 * The port defines the contract for retrieving portfolio information for
 * a given language. Implementations in the application layer must
 * enforce validation rules and delegate to the appropriate outbound
 * ports to fetch data.
 */
class GetPortfolioPort {
  /**
   * Execute the use case.
   *
   * @param {string} _languageCode ISO 4217 language code (3 characters)
   * @returns {Promise<any>}
   */
  async execute(_languageCode) {
    throw new Error('Method not implemented');
  }
}

module.exports = { GetPortfolioPort };