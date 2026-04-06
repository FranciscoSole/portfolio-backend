/**
 * Domain entity representing an education or study entry.
 */
class Study {
  /**
   * @param {{ organizationName: string, title: string, startDate: string|null, endDate: string|null }} param0
   */
  constructor({ organizationName, title, startDate, endDate }) {
    this.organizationName = organizationName;
    this.title = title;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}

module.exports = { Study };