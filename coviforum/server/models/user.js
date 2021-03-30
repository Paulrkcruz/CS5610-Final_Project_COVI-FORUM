const { v4: uuidv4 } = require("uuid");
// User class
class User {
  constructor(name, hashed_password, email) {
    this.name = name;
    this.hashed_password = hashed_password;
    this.created = Date.now();
    this.updated = this.created;
    this.email = email;
    this.active = 1;
    this.id = uuidv4();
  }
  // Read json
  static from(json) {
    const u = new User();
    return Object.assign(u, json);
  }
}
module.exports = User;
