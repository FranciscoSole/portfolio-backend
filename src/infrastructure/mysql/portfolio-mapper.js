const { Portfolio } = require('domain/entities/portfolio.entity');
const { Job } = require('domain/entities/job.entity');
const { Study } = require('domain/entities/study.entity');
const { Project } = require('domain/entities/project.entity');
const { Certification } = require('domain/entities/certification.entity');
const { JobHighlight } = require('domain/entities/job-highlight.entity');
const { Technology } = require('domain/entities/technology.entity');

/**
 * Format a date value into ISO string (YYYY-MM-DD). Null/undefined values are
 * returned as null to avoid exposing invalid dates.
 *
 * @param {Date} value
 * @returns {string|null}
 */
function formatDate(value) {
  if (!value) {
    return null;
  }

  return value.toISOString().slice(0, 10);
}

/**
 * Group items by a key. The keySelector function extracts the group key and
 * the valueSelector function transforms the item into a value that will be
 * inserted into the resulting array for that key.
 *
 * @template K, V, T
 * @param {Array<T>} items
 * @param {(item: T) => K} keySelector
 * @param {(item: T) => V} valueSelector
 * @returns {Record<K, V[]>}
 */
function groupValuesBy(items, keySelector, valueSelector) {
  return items.reduce((acc, item) => {
    const key = keySelector(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(valueSelector(item));
    return acc;
  }, {});
}

/**
 * Create a Technology domain object from a raw row.
 *
 * @param {{ technology: string, category: string }} row
 * @returns {Technology}
 */
function mapTechnology(row) {
  return new Technology({ technology: row.technology, category: row.category });
}

/**
 * Group technology rows by the owning foreign key (job_id or project_id).
 *
 * @param {Array<any>} rows
 * @param {string} ownerKey
 * @returns {Record<any, Technology[]>}
 */
function groupTechnologiesBy(rows, ownerKey) {
  return groupValuesBy(rows, (row) => row[ownerKey], mapTechnology);
}

/**
 * Create a JobHighlight domain object from a raw row.
 *
 * @param {{ type: string, item_information: string }} row
 * @returns {JobHighlight}
 */
function mapHighlight(row) {
  return new JobHighlight({ type: row.type, itemInformation: row.item_information });
}

/**
 * Mapper responsible for converting raw persistence result sets into
 * rich domain entities. This adapter lives in the infrastructure layer
 * because it understands the shape of the persistence layer.
 */
class PortfolioMapper {
  /**
   * Transform the aggregated raw data into a Portfolio aggregate composed
   * of domain entities.
   *
   * @param {{
   *   jobsRows: Array<any>,
   *   jobHighlightsRows: Array<any>,
   *   jobTechnologiesRows: Array<any>,
   *   studiesRows: Array<any>,
   *   projectsRows: Array<any>,
   *   projectTechnologiesRows: Array<any>,
   *   certificationsRows: Array<any>
   * }} data
   * @returns {Portfolio}
   */
  toDomain(data) {
    const highlightsByJobId = groupValuesBy(
      data.jobHighlightsRows,
      (row) => row.job_id,
      mapHighlight
    );
    const technologiesByJobId = groupTechnologiesBy(
      data.jobTechnologiesRows,
      'job_id'
    );
    const technologiesByProjectId = groupTechnologiesBy(
      data.projectTechnologiesRows,
      'project_id'
    );
    const jobs = data.jobsRows.map((row) =>
      new Job({
        id: row.id,
        companyName: row.company_name,
        location: row.location,
        position: row.position,
        startDate: formatDate(row.start_date),
        endDate: formatDate(row.end_date),
        description: row.description,
        highlights: highlightsByJobId[row.id] ?? [],
        technologies: technologiesByJobId[row.id] ?? []
      })
    );
    const studies = data.studiesRows.map((row) =>
      new Study({
        organizationName: row.organization_name,
        title: row.title,
        startDate: formatDate(row.start_date),
        endDate: formatDate(row.end_date)
      })
    );
    const projects = data.projectsRows.map((row) =>
      new Project({
        id: row.id,
        project: row.project,
        description: row.description,
        repositoryUrl: row.repository_url,
        technologies: technologiesByProjectId[row.id] ?? []
      })
    );
    const certifications = data.certificationsRows.map((row) =>
      new Certification({
        certification: row.certification,
        issuer: row.issuer,
        issueDate: formatDate(row.issue_date),
        credentialId: row.credential_id,
        credentialUrl: row.credential_url
      })
    );
    return new Portfolio({ jobs, studies, projects, certifications });
  }
}

module.exports = { PortfolioMapper };