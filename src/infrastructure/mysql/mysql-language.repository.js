const { LanguageRepositoryPort } = require('domain/ports/outbound/language.repository');

/**
 * MySQL adapter implementing the LanguageRepositoryPort. This class executes
 * SQL queries against a MySQL database using the provided connection pool.
 * The queries are intentionally left unchanged from the original code to
 * satisfy the requirement that existing queries must be preserved. The
 * adapter simply passes through the results in a format expected by the
 * domain layer.
 */
class MySqlLanguageRepository extends LanguageRepositoryPort {
  /**
   * @param {import('mysql2/promise').Pool} db
   */
  constructor(db) {
    super();
    this.db = db;
  }

  /**
   * {@inheritdoc}
   */
  async getActiveLanguages() {
    const [rows] = await this.db.query(
      `
      SELECT code, language
      FROM languages
      WHERE is_active = 1
      ORDER BY language ASC
      `
    );
    return rows.map((row) => ({
      code: row.code,
      language: row.language
    }));
  }

  /**
   * {@inheritdoc}
   */
  async existsActiveByCode(code) {
    const [rows] = await this.db.query(
      `
      SELECT 1
      FROM languages
      WHERE code = ? AND is_active = 1
      `,
      [code]
    );
    return Boolean(rows.length);
  }
}

module.exports = { MySqlLanguageRepository };