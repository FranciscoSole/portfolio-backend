/**
 * Outbound port for portfolio persistence.
 *
 * This port defines the operations that the domain layer expects for
 * retrieving portfolio information. The concrete implementation is
 * responsible for executing the queries against the underlying data
 * store and returning the raw result. Mapping of that result into
 * domain entities may be handled by a separate component.
 */
class PortfolioRepositoryPort {
  /**
   * Retrieve all of the data required to build a portfolio for the given
   * language code. The returned object contains multiple result sets
   * grouped by resource type.
   *
   * @param {string} _languageCode
   * @returns {Promise<{
   *   jobsRows: Array<any>,
   *   jobHighlightsRows: Array<any>,
   *   jobTechnologiesRows: Array<any>,
   *   studiesRows: Array<any>,
   *   projectsRows: Array<any>,
   *   projectTechnologiesRows: Array<any>,
   *   certificationsRows: Array<any>
   * }>}
   */
  async getPortfolioDataByLanguageCode(_languageCode) {
    throw new Error('Method not implemented');
  }
}

module.exports = { PortfolioRepositoryPort };