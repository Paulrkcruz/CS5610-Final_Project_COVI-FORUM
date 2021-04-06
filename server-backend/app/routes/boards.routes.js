module.exports = app => {
  const boards = require("../controllers/boards.controller.js");

  const router = require("express").Router();

  // Create new
  router.post("/", boards.createBoards);

  // Retrieve all
  router.get("/", boards.findAll);

  // Retrieve all published boards
  router.get("/published", boards.findAllPublished);

  // Retrieve a single with id
  router.get("/:id", boards.findOneBoards);

  // Update with id
  router.put("/:id", boards.update);

  // Delete with id
  router.delete("/:id", boards.delete);

  // Delete all
  router.delete("/", boards.deleteAll);

  app.use('/api/boards', router);
};
