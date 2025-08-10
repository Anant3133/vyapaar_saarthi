// dtos/DocumentDTO.js

class DocumentOutputDTO {
  constructor(doc) {
    this.id = doc.id;
    this.document_type = doc.document_type;
    this.url = doc.url;
    this.uploaded_at = doc.uploaded_at;
    this.user_id = doc.user_id;
    this.business_id = doc.business_id;
    this.license_application_id = doc.license_application_id;
  }
}

class DocumentInputDTO {
  constructor({ document_type, url, user_id, business_id, license_application_id }) {
    this.document_type = document_type;
    this.url = url;
    this.user_id = user_id;
    this.business_id = business_id;
    this.license_application_id = license_application_id;
  }
}

module.exports = { DocumentOutputDTO, DocumentInputDTO };
