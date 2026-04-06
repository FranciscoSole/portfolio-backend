const { PortfolioRepositoryPort } = require('domain/ports/outbound/portfolio.repository');

/**
 * MySQL adapter implementing the PortfolioRepositoryPort. This class
 * encapsulates all SQL queries necessary to fetch the complete set of
 * portfolio data for a given language code. The queries are preserved
 * verbatim from the original implementation to ensure that the results
 * remain consistent with the previous behavior.
 */
class MySqlPortfolioRepository extends PortfolioRepositoryPort {
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
  async getPortfolioDataByLanguageCode(languageCode) {
    const [
      jobsRows,
      jobHighlightsRows,
      jobTechnologiesRows,
      studiesRows,
      projectsRows,
      projectTechnologiesRows,
      certificationsRows
    ] = await Promise.all([
      this.getJobs(languageCode),
      this.getJobHighlights(languageCode),
      this.getJobTechnologies(languageCode),
      this.getStudies(languageCode),
      this.getProjects(languageCode),
      this.getProjectTechnologies(languageCode),
      this.getCertifications(languageCode)
    ]);
    return {
      jobsRows,
      jobHighlightsRows,
      jobTechnologiesRows,
      studiesRows,
      projectsRows,
      projectTechnologiesRows,
      certificationsRows
    };
  }

  /**
   * Query jobs for a language.
   *
   * @param {string} languageCode
   * @returns {Promise<Array<any>>}
   */
  async getJobs(languageCode) {
    const [rows] = await this.db.query(
      `
      SELECT
        j.id,
        j.company_name,
        j.location,
        j.position,
        j.start_date,
        j.end_date,
        j.description
      FROM jobs j
      WHERE j.language_code = ?
      ORDER BY j.start_date DESC, j.id DESC
      `,
      [languageCode]
    );
    return rows;
  }

  /**
   * Query job highlights for a language.
   *
   * @param {string} languageCode
   * @returns {Promise<Array<any>>}
   */
  async getJobHighlights(languageCode) {
    const [rows] = await this.db.query(
      `
      SELECT
        jh.job_id,
        c.category AS type,
        jh.item_information
      FROM job_highlights jh
      INNER JOIN categories c
        ON c.generic_id = jh.type
       AND c.language_code IN (?, '*')
      ORDER BY jh.job_id ASC, jh.type ASC
      `,
      [languageCode]
    );
    return rows;
  }

  /**
   * Query job technologies for a language.
   *
   * @param {string} languageCode
   * @returns {Promise<Array<any>>}
   */
  async getJobTechnologies(languageCode) {
    const [rows] = await this.db.query(
      `
      SELECT
        jt.job_id,
        t.technology,
        c.category
      FROM job_technology jt
      INNER JOIN technologies t
        ON t.id = jt.technology_id
      INNER JOIN categories c
        ON c.generic_id = t.category_id
       AND c.language_code IN (?, '*')
      ORDER BY jt.job_id ASC, t.id ASC
      `,
      [languageCode]
    );
    return rows;
  }

  /**
   * Query studies for a language.
   *
   * @param {string} languageCode
   * @returns {Promise<Array<any>>}
   */
  async getStudies(languageCode) {
    const [rows] = await this.db.query(
      `
      SELECT
        s.organization_name,
        s.title,
        s.start_date,
        s.end_date
      FROM studies s
      WHERE s.language_code = ?
      ORDER BY s.start_date DESC, s.id DESC
      `,
      [languageCode]
    );
    return rows;
  }

  /**
   * Query projects for a language.
   *
   * @param {string} languageCode
   * @returns {Promise<Array<any>>}
   */
  async getProjects(languageCode) {
    const [rows] = await this.db.query(
      `
      SELECT
        p.id,
        p.project,
        p.description,
        p.repository_url
      FROM projects p
      WHERE p.language_code = ?
      ORDER BY p.id DESC
      `,
      [languageCode]
    );
    return rows;
  }

  /**
   * Query project technologies for a language.
   *
   * @param {string} languageCode
   * @returns {Promise<Array<any>>}
   */
  async getProjectTechnologies(languageCode) {
    const [rows] = await this.db.query(
      `
      SELECT
        pt.project_id,
        t.id AS technology_id,
        t.technology,
        c.category
      FROM project_technology pt
      INNER JOIN technologies t
        ON t.id = pt.technology_id
      INNER JOIN categories c
        ON c.generic_id = t.category_id
       AND c.language_code IN (?, '*')
      ORDER BY pt.project_id ASC, t.id ASC
      `,
      [languageCode]
    );
    return rows;
  }

  /**
   * Query certifications for a language.
   *
   * @param {string} languageCode
   * @returns {Promise<Array<any>>}
   */
  async getCertifications(languageCode) {
    const [rows] = await this.db.query(
      `
      SELECT
        c.certification,
        c.issuer,
        c.issue_date,
        c.credential_id,
        c.credential_url
      FROM certifications c
      WHERE c.language_code IN (?, '*')
      ORDER BY c.issue_date DESC, c.id DESC
      `,
      [languageCode]
    );
    return rows;
  }
}

module.exports = { MySqlPortfolioRepository };