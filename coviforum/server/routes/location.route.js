const express = require("express");
const locationController = require("../controllers/location.controller");
const router = express.Router();
// Get locations
const getAllLocations = (req, res) => {
  // read database
  locationController
    .getLocations()
    .then((locations) => {
      res.json(locations);
    })
    .catch((err) => {
      res.status(500);
      res.json({
        "status-code": 500,
        message: err || "ERROR: Request error 500. Please refresh your browser.",
      });
    });
};

router.get("/all", getAllLocations);
module.exports = router;
