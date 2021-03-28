const { v4: uuidv4 } = require("uuid");
// Board - Discussion Board Class
class Board {
  constructor(subject, userId, tags) {
    this.subject = subject;
    this.created = Date.now();
    this.active = 1;
    this.userId = userId;
    this.user = undefined;
    this.posts = [];
    this.tags = tags;
    this.id = uuidv4();
  }

  static from(json) {
    const u = new Board();
    return Object.assign(u, json);
  }
}

// Export user class
module.exports = Board;
