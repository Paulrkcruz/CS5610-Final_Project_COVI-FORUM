const db = require("../models");
const Boards = db.boards;
const Op = db.Sequelize.Op;

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

// Find a single Boards with an id
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
// Find a single Boards with an id
exports.getBoards = (req, res) => {
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

// Update a Boards by the id in the request
exports.updateBoards = (req, res) => {
  const id = req.params.id;

  Boards.updateBoards(req.body, {
    where: { id: id }
  })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Boards was updated successfully."
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
exports.deleteBoards = (req, res) => {
  const id = req.params.id;

  Boards.destroy({
    where: { id: id }
  })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Boards was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Boards with id=${id}. Maybe Boards was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Boards with id=" + id
        });
      });
};

// Delete all Boards from the database.
exports.deleteAllBoards = (req, res) => {
  Boards.destroy({
    where: {},
    truncate: false
  })
      .then(nums => {
        res.send({ message: `${nums} Boards were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while removing all boards."
        });
      });
};

// find all published Boards
exports.findAllPublishedBoards = (req, res) => {
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
