// dtos/BusinessDTO.js

class BusinessOutputDTO {
  constructor(business) {
    this.id = business.id;
    this.business_name = business.business_name;
    this.location = business.location;
    this.registration_number = business.registration_number;
    this.business_type = business.business_type;
    this.sector = business.sector;
    this.gstin = business.gstin;
    this.incorporation_date = business.incorporation_date;
  }
}

class BusinessInputDTO {
  constructor({ business_name, location, registration_number, business_type, sector, gstin, incorporation_date }) {
    this.business_name = business_name;
    this.location = location;
    this.registration_number = registration_number;
    this.business_type = business_type;
    this.sector = sector;
    this.gstin = gstin;
    this.incorporation_date = incorporation_date;
  }
}

module.exports = { BusinessOutputDTO, BusinessInputDTO };
