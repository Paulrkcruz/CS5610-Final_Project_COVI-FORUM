const db = require("../models");
const Boards = db.boards;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: boards } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, boards, totalPages, currentPage };
};

// Create and Save a new Boards
exports.create = (req, res) => {
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
  Boards.create(boards)
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
  const { page, size, title } = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  Boards.findAndCountAll({ where: condition, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
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

// Update a Boards by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Boards.update(req.body, {
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
exports.delete = (req, res) => {
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
exports.deleteAll = (req, res) => {
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
exports.findAllPublished = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  Boards.findAndCountAll({ where: { published: true }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving boards."
      });
    });
};