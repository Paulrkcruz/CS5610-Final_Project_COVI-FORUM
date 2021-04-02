const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../config/db.config");
const User = db.USER;

// eslint-disable-next-line no-undef
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

// eslint-disable-next-line no-undef
isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Requires Admin Role!"
      });
      return;
    });
  });
};

// eslint-disable-next-line no-undef
isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Requires Moderator Role!"
      });
    });
  });
};

// eslint-disable-next-line no-undef
isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Requires Moderator or Admin Role!"
      });
    });
  });
};

const authJwt = {
  // eslint-disable-next-line no-undef
  verifyToken: verifyToken,
  // eslint-disable-next-line no-undef
  isAdmin: isAdmin,
  // eslint-disable-next-line no-undef
  isModerator: isModerator,
  // eslint-disable-next-line no-undef
  isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;
