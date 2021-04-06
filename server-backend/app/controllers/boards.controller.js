const db = require("../models");
const Boards = db.boards;
const Op = db.Sequelize.Op;
const Comment = db.comments;

// Create and Save new Comments
exports.createComment = (boardsId, comment) => {
  return Comment.create({
    name: comment.name,
    text: comment.text,
    boardsId: boardsId,
  })
      .then((comment) => {
        console.log(">> Created comment: " + JSON.stringify(comment, null, 4));
        return comment;
      })
      .catch((err) => {
        console.log(">> Error while creating comment: ", err);
      });
};

// Get the comments for a given boards
exports.findBoardsById = (boardsId) => {
  return Boards.findByPk(boardsId, { include: ["comments"] })
      .then((boards) => {
        return boards;
      })
      .catch((err) => {
        console.log(">> Error while finding boards: ", err);
      });
};

// Get the comments for a given comment id
exports.findCommentById = (id) => {
  return Comment.findByPk(id, { include: ["boards"] })
      .then((comment) => {
        return comment;
      })
      .catch((err) => {
        console.log(">> Error while finding comment: ", err);
      });
};

// Get all Boards include comments
exports.findAll = () => {
  return Boards.findAll({
    include: ["comments"],
  }).then((boards) => {
    return boards;
  });
};

// Create and Save a new Boards
exports.createBoards = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Boards
  const boards = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Boards in the database
  Boards.createBoards(boards)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Boards."
      });
    });
};

// Retrieve all Boards from the database.
exports.findAllBoards = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Boards.findAllBoards({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving boards."
      });
    });
};

// Find a with an id
exports.findOneBoards = (req, res) => {
  const id = req.params.id;

  Boards.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Boards with id=" + id
      });
    });
};

// Update a by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Boards.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      // eslint-disable-next-line eqeqeq
      if (num == 1) {
        res.send({
          message: "Updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Boards with id=${id}. Maybe Boards was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Boards with id=" + id
      });
    });
};

// Delete a Boards with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Boards.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Delete successful!"
        });
      } else {
        res.send({
          message: `Cannot delete id=${id}. Please try again`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete with id=" + id
      });
    });
};

// Delete all Boards from the database.
exports.deleteAll = (req, res) => {
  Boards.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Boardss were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all boards."
      });
    });
};

// find all published Boards
exports.findAllPublished = (req, res) => {
  Boards.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving boards."
      });
    });
};

