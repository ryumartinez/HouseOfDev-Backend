const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/propertiesController");
const verifyJWT = require("../middlewares/verifyJWT");

router
  .route("/")
  .get(propertyController.getAllProperties)
  .post(verifyJWT,propertyController.createNewProperty)
router.route("/:id")
  .delete(verifyJWT,propertyController.deleteProperty);
router
  .route("/search")
  .get(propertyController.searchProperties)
module.exports = router;
