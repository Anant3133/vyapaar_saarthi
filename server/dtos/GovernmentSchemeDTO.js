// dtos/GovernmentSchemeDTO.js

class GovernmentSchemeOutputDTO {
  constructor(scheme) {
    this.id = scheme.id;
    this.name = scheme.name;
    this.description = scheme.description;
    this.eligibility_criteria = scheme.eligibility_criteria;
    this.benefits = scheme.benefits;
    this.department = scheme.department;
    this.application_link = scheme.application_link;
  }
}

module.exports = { GovernmentSchemeOutputDTO };
