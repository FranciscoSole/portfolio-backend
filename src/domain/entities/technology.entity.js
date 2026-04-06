/**
 * Domain value object representing a technology.
 */
class Technology {
  /**
   * @param {{ technology: string, category: string }} param0
   */
  constructor({ technology, category }) {
    this.technology = technology;
    this.category = category;
  }
}

module.exports = { Technology };