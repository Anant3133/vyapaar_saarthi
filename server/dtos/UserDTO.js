// dtos/UserDTO.js

// Output DTO (what you send to frontend)
class UserOutputDTO {
  constructor(user) {
    this.id = user.id;
    this.full_name = user.full_name;
    this.email = user.email;
    this.phone_number = user.phone_number;
    this.website = user.website;
    this.address = user.address;
    this.city = user.city;
    this.pin_code = user.pin_code;
    this.bio = user.bio;
    this.profile_picture = user.profile_picture;
    this.email_verified = user.email_verified;
    this.phone_verified = user.phone_verified;
    this.two_factor_enabled = user.two_factor_enabled;
  }
}

// Input DTO (for registration or update)
class UserInputDTO {
  constructor({ full_name, email, phone_number, website, address, city, pin_code, bio, password }) {
    this.full_name = full_name;
    this.email = email;
    this.phone_number = phone_number;
    this.website = website;
    this.address = address;
    this.city = city;
    this.pin_code = pin_code;
    this.bio = bio;
    this.password = password; // raw password for hashing
  }
}

module.exports = { UserOutputDTO, UserInputDTO };
