const helper = require("./helper");
const express = require("express");
const userController = require("../controllers/user.controller");
const threadController = require("../controllers/thread.controller");
const User = require("../models/user");
const router = express.Router();
// SOURCE: https://dev.to/anilsingh/create-use-helper-functions-react-component-1jhj
// Above source helped develop this
// Account for Users
const getStats = async (req, res) => {
// Use Promise
// Access db
  const promises = [
    userController.getAmountOfUsers(),
    threadController.getAmountOfBoards(),
    threadController.getAmountOfMsgs(),
  ];
  try {
    const result = await Promise.all(promises);
    let json = {};
    if (result && result.length) {
      for (let item of result) {
        const k = Object.keys(item);
        for (let i = 0; i < k.length; i++) {
          json[k[i]] = item[k[i]];
        }
      }
    }
    res.json(json);
  } catch (error) {
    res.status(500);
    res.json({
      "status-code": 500,
      message: "ERROR: Request failed with error 500.. Refresh browser and try again.",
    });
  }
};

/SignUp
const register = (req, res) => {
  if (req && req.body) {
    if (!req.body.name || !req.body.email || !req.body.hashed_password) {
      return res.status(400).send("ALL Fields must be filled to register.");
    }

    // Create user object from the POST body
    const newUser = User.from(req.body);
    console.log("newUser", newUser);
    // Check if the email is used already
    helper
      .doesUserExist(newUser.email)
      .then(() => {
        // Add user and return the added user
        userController
          .addUser(newUser)
          .then((users) => {
            res.json(users);
          })
          .catch((err) => {
            // Failed to add user
            res.status(500); // 500 Internal Server Error
            res.json({
              "status-code": 500,
              message: err || "failed to register",
            });
          });
      })
      .catch((err) => {
        res.status(202);
        res.send(err);
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

const login = (req, res) => {
  if (req && req.body) {
    // Check if all fields are set
    if (!req.body.email || !req.body.password) {
      return res.status(400).send("One of the required fields is not set");
    }

    const email = req.body.email;
    const hashed_password = req.body.password;

    userController
      .readUser({ email, hashed_password })
      .then((doc) => {
        if (doc && doc.length && doc.length > 0) {
          res.json(doc[0]);
        } else {
          res.status(202);
          res.send("User not found. Please check your password..");
        }
      })
      .catch(() => {
        res.status(500);
        res.json({
          "status-code": 500,
          message: "User not found. Please check your User Name and try again..",
        });
      });
  } else {
    res.status(500);     res.json({
      "status-code": 500,
      message: "Request failed with error 500. Please refresh your browser and try again",
    });
  }
};
router.post("/register", register);
router.post("/login", login);

// Export user router
module.exports = router;
