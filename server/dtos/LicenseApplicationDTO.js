// dtos/LicenseApplicationDTO.js

class LicenseApplicationOutputDTO {
  constructor(app) {
    this.id = app.id;
    this.business_id = app.business_id;
    this.license_type = app.license_type;
    this.status = app.status;
    this.application_date = app.application_date;
    this.approval_date = app.approval_date;
    this.comments = app.comments;
    this.document_url = app.document_url;
    this.tracking_number = app.tracking_number;
  }
}

class LicenseApplicationInputDTO {
  constructor({ business_id, license_type, application_date, document_url }) {
    this.business_id = business_id;
    this.license_type = license_type;
    this.application_date = application_date || new Date();
    this.document_url = document_url;
  }
}

module.exports = { LicenseApplicationOutputDTO, LicenseApplicationInputDTO };
