module.exports = app => {
  const boards = require("../controllers/boards.controller.js");

  var router = require("express").Router();

  // Create a new Boards
  router.post("/", boards.create);

  // Retrieve all Boards
  router.get("/", boards.findAllBoards);

  // Retrieve all published Boards
  router.get("/published", boards.findAllPublished);

  // Retrieve a single Boards with id
  router.get("/:id", boards.findOne);

  // Update a Boards with id
  router.put("/:id", boards.update);

  // Delete a Boards with id
  router.delete("/:id", boards.delete);

  // Create a new Boards
  router.delete("/", boards.deleteAll);

  app.use('/api/boards', router);
};