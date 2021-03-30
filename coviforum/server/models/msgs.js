const { v4: uuidv4 } = require("uuid");
// Msgs
class Msgs {
  constructor(boardId, content, userId) {
    this.boardId = boardId;
    this.created = Date.now();
    this.active = 1;
    this.userId = userId;
    this.content = content;
    this.id = uuidv4();
  }
  static from(json) {
    const u = new Msgs();
    return Object.assign(u, json);
  }
}
module.exports = Msgs;