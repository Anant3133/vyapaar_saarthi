// dtos/SchemeApplicationDTO.js

class SchemeApplicationOutputDTO {
  constructor(app) {
    this.id = app.id;
    this.user_id = app.user_id;
    this.scheme_id = app.scheme_id;
    this.status = app.status;
    this.application_date = app.application_date;
    this.document_url = app.document_url;
    this.feedback_notes = app.feedback_notes;
  }
}

class SchemeApplicationInputDTO {
  constructor({ user_id, scheme_id, document_url }) {
    this.user_id = user_id;
    this.scheme_id = scheme_id;
    this.document_url = document_url;
  }
}

module.exports = { SchemeApplicationOutputDTO, SchemeApplicationInputDTO };
