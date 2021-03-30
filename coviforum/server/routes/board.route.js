const express = require("express");
const boardController = require("../controllers/board.controller");
const locationController = require("../controllers/location.controller");
const Board = require("../models/board");
const Post = require("../models/msgs");
const router = express.Router();
const helper = require("./helper");

const addBoard = async (req, res) => {
  if (req && req.body) {
    // Do more validation -> check if userId exists
    if (
      !req.body.userId ||
      (req.body.userId && req.body.userId.length !== 36)
    ) {
      return res.status(400).send("UserId is not valid"); // Invalid ID length
    } else {
      const idExists = await helper.doesUserExistByUserId(req.body.userId);
      if (!idExists) {
        return res.status(400).send("UserId is not valid"); // ID doesn't exist
      }
    }

    let tags = [];
    if (req.body.tags) {
      try {
        tags = JSON.parse(req.body.tags);
      } catch (error) {
        console.error("Failed to parse tags", req.body.tags);
      }
    }

    // Create board object
    const board = new Board(req.body.subject, req.body.userId, tags);

    // create first post
    const post = new Post(board.id, req.body.message || "", req.body.userId);

    // push post into board
    board.posts.push(post);

    // Add user and return the added user
    boardController
      .addBoard(board)
      .then((board) => {
        res.json(board);
      })
      .catch((err) => {
        // Failed to add board
        res.status(500); // 500 Internal Server Error
        res.json({
          "status-code": 500,
          message: err || "failed to add board",
        });
      });
  } else {
    // No form data found
    res.status(500); // 500 Internal Server Error
    res.json({
      "status-code": 500,
      message: "No request body found",
    });
  }
};

const getAllBoards = (req, res) => {
  // read entire table
  boardController
    .readBoards()
    .then((boards) => {
      res.json(boards);
    })
    .catch((err) => {
      // Database call failed return 500 error
      res.status(500); // 500 Internal Server Error
      res.json({
        "status-code": 500,
        message: err || "failed request",
      });
    });
};

const getOneBoard = async (req, res) => {
  const id = req.query.id;

  if (!id || id.length !== 36) {
    return res.status(400).send("id is not valid"); // Invalid ID length
  } else {
    const idExists = await helper.doesBoardExistByBoardId(id);
    if (!idExists) {
      return res.status(400).send("id is not valid"); // ID doesn't exist
    }
  }

  // read entire table
  boardController
    .readBoard(id)
    .then((board) => {
      res.json(board);
    })
    .catch((err) => {
      // Database call failed return 500 error
      res.status(500); // 500 Internal Server Error
      res.json({
        "status-code": 500,
        message: err || "failed request",
      });
    });
};

const addPost = async (req, res) => {
  if (req && req.body) {
    // Do more validation -> check if userId exists
    if (
      !req.body.userId ||
      (req.body.userId && req.body.userId.length !== 36)
    ) {
      return res.status(400).send("UserId is not valid"); // Invalid ID length
    } else {
      const idExists = await helper.doesUserExistByUserId(req.body.userId);
      if (!idExists) {
        return res.status(400).send("UserId is not valid"); // ID doesn't exist
      }
    }

    // Do more validation -> check if boardID exists
    if (
      !req.body.boardId ||
      (req.body.userId && req.body.userId.length !== 36)
    ) {
      return res.status(400).send("boardID is not valid"); // Invalid ID length
    } else {
      const idExists = await helper.doesBoardExistByBoardId(
        req.body.boardId
      );
      if (!idExists) {
        return res.status(400).send("boardID is not valid"); // ID doesn't exist
      }
    }

    // insert location in location database
    if (req.body.location) {
      try {
        const location = JSON.parse(req.body.location);
        if (location && location.long && location.lat) {
          await locationController.addLocation(location.long, location.lat);
        }
      } catch (error) {
        console.error("Failed to parse location");
      }
    }

    // Create post object
    const post = new Post(
      req.body.boardId,
      req.body.message || "",
      req.body.userId
    );

    // Add user and return the added user
    boardController
      .addPost(post)
      .then((post) => {
        res.json(post);
      })
      .catch((err) => {
        // Failed to add Post
        res.status(500); // 500 Internal Server Error
        res.json({
          "status-code": 500,
          message: err || "failed to add post",
        });
      });
  } else {
    // No form data found
    res.status(500); // 500 Internal Server Error
    res.json({
      "status-code": 500,
      message: "No request body found",
    });
  }
};

const searchInBoards = async (req, res) => {
  const searchTerm = req.query.searchTerm;

  if (!searchTerm) {
    return res.status(400).send("id is not valid"); // Invalid ID length
  }

  // read entire table
  boardController
    .searchBoard(searchTerm)
    .then((board) => {
      res.json(board);
    })
    .catch((err) => {
      // Database call failed return 500 error
      res.status(500); // 500 Internal Server Error
      res.json({
        "status-code": 500,
        message: err || "failed request",
      });
    });
};

// Routes
router.post("/add", addBoard);

router.post("/add-post", addPost);

// example: localhost:3000/board/all
router.get("/all", getAllBoards);

// example: localhost:3000/board/one?id=1b29376f-71d3-4c54-875c-cc1898a55819
router.get("/one", getOneBoard);

router.get("/search", searchInBoards);

// Export user router
module.exports = router;
