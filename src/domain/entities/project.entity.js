const { Technology } = require('./technology.entity');

/**
 * Domain entity representing a project.
 */
class Project {
  /**
   * @param {{ id: any, project: string, description: string, repositoryUrl: string|null, technologies: Array<Technology> }} param0
   */
  constructor({ id, project, description, repositoryUrl, technologies = [] }) {
    this.id = id;
    this.project = project;
    this.description = description;
    this.repositoryUrl = repositoryUrl;
    this.technologies = technologies;
  }
}

module.exports = { Project };