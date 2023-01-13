const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/propertiesController");
const verifyJWT = require("../middlewares/verifyJWT");

router
  .route("/")
  .get(propertyController.getAllProperties)
  .post(propertyController.createNewProperty)
  .delete(propertyController.deleteProperty);
router
  .route("/search")
  .get(propertyController.searchProperties)
module.exports = router;
