// SOURCE: https://dev.to/anilsingh/create-use-helper-functions-react-component-1jhj
// Maybe some bugs here
const userController = require("../controllers/user.controller");
const boardController = require("../controllers/board.controller");
// Find user by ID
const doesUserExistByUserId = (id) => {
  return new Promise((resolve, reject) => {
    userController
      .readUser({ id })
      .then((doc) => {
        if (doc && doc.length && doc.length > 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(() => {
          // Catch errors
        reject("Request failed. Please try again,");
      });
  });
};

// Find user by Email
const doesUserExist = (email) => {
  return new Promise((resolve, reject) => {
    userController
      .readUser({ email })
      .then((doc) => {
        if (doc && doc.length && doc.length > 0) {
                      // Catch errors
        reject("Request failed. Please try again,");
        } else {
          resolve();
        }
      })
      .catch(() => {
                    // Catch errors
        reject("Request failed. Please try again,");
      });
  });
};

// Find Board by ID
const doesBoardExistByBoardId = (id) => {
// return Promise or reject
// needs work
  return new Promise((resolve, reject) => {
    boardController
      .checkBoardID({ id })
      .then((doc) => {
        if (doc && doc.length && doc.length > 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(() => {
                    // Catch errors
        reject("Request failed. Please try again,");
      });
  });
};

module.exports = {
  doesUserExist,
  doesUserExistByUserId,
  doesBoardExistByBoardId,
};
