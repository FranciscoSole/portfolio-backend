/**
 * Domain entity representing a certification.
 */
class Certification {
  /**
   * @param {{ certification: string, issuer: string, issueDate: string|null, credentialId: string|null, credentialUrl: string|null }} param0
   */
  constructor({ certification, issuer, issueDate, credentialId, credentialUrl }) {
    this.certification = certification;
    this.issuer = issuer;
    this.issueDate = issueDate;
    this.credentialId = credentialId;
    this.credentialUrl = credentialUrl;
  }
}

module.exports = { Certification };