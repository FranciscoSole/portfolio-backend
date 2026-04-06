/**
 * Domain entity representing a job.
 */
class Job {
  /**
   * @param {{ id: any, companyName: string, location: string, position: string, startDate: string|null, endDate: string|null, description: string, highlights: Array<JobHighlight>, technologies: Array<Technology> }} param0
   */
  constructor({ id, companyName, location, position, startDate, endDate, description, highlights = [], technologies = [] }) {
    this.id = id;
    this.companyName = companyName;
    this.location = location;
    this.position = position;
    this.startDate = startDate;
    this.endDate = endDate;
    this.description = description;
    this.highlights = highlights;
    this.technologies = technologies;
  }
}

module.exports = { Job };