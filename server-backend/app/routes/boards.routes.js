module.exports = app => {
  const boards = require("../controllers/boards.controller.js");

  var router = require("express").Router();

  // Create a new Boards
  router.post("/", boards.createBoards);

  // Retrieve all Boards
  router.get("/", boards.findAllBoards);

  // Retrieve all published Boards
  router.get("/published", boards.findAllPublishedBoards);

  // Retrieve a single Boards with id
  router.get("/:id", boards.findOneBoards);

  // Retrieve a single Boards with id
  router.get("/:id", boards.getBoards);

  // Update a Boards with id
  router.put("/:id", boards.updateBoards);

  // Delete a Boards with id
  router.delete("/:id", boards.deleteBoards);

  // Delete all Boards
  router.delete("/", boards.deleteAllBoards);

  app.use('/api/boards', router);
};
