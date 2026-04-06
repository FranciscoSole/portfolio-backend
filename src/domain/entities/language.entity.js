/**
 * Domain entity representing a language.
 */
class Language {
  /**
   * @param {{ code: string, language: string }} param0
   */
  constructor({ code, language }) {
    this.code = code;
    this.language = language;
  }
}

module.exports = { Language };