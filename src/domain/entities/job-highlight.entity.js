/**
 * Domain value object representing a highlight within a job.
 */
class JobHighlight {
  /**
   * @param {{ type: string, itemInformation: string }} param0
   */
  constructor({ type, itemInformation }) {
    this.type = type;
    this.itemInformation = itemInformation;
  }
}

module.exports = { JobHighlight };