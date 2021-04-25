module.exports = app => {
  const boards = require("../controllers/boards.controller.js");

  const router = require("express").Router();

  // Create a new Boards
  router.post("/", boards.create);

  // Retrieve all Boards
  router.get("/", boards.findAllBoards);

  // Retrieve all published Boards
  router.get("/published", boards.findAllPublished);

  // Retrieve a single Boards with id
  router.get("/:id", boards.findOneBoards);

  // Retrieve a single Boards post by username
  router.get("/:username", boards.findBoardByUserName);

  // Update a Boards with id
  router.put("/:id", boards.update);

  // Delete a Boards with id
  router.delete("/:id", boards.delete);

  // Create a new Boards
  router.delete("/", boards.deleteAll);

  app.use('/api/boards', router);
};