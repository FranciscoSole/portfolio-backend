const { Job } = require('./job.entity');
const { Study } = require('./study.entity');
const { Project } = require('./project.entity');
const { Certification } = require('./certification.entity');

/**
 * Domain aggregate root representing a portfolio. A portfolio consists of
 * multiple jobs, studies, projects and certifications.
 */
class Portfolio {
  /**
   * @param {{ jobs: Array<Job>, studies: Array<Study>, projects: Array<Project>, certifications: Array<Certification> }} param0
   */
  constructor({ jobs = [], studies = [], projects = [], certifications = [] }) {
    this.jobs = jobs;
    this.studies = studies;
    this.projects = projects;
    this.certifications = certifications;
  }
}

module.exports = { Portfolio };