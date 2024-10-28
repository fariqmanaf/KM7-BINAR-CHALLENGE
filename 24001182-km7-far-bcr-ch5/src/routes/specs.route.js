const express = require("express");
const {
  validateGetSpecs,
  validateGetSpecsById,
  validateCreateSpecs,
  validateUpdateSpecs,
  validateDeleteSpecs,
} = require("../middleware/specs");
const {
  getSpecsController,
  getSpecsByIdController,
  createSpecsController,
  updateSpecsController,
  deleteSpecsController,
} = require("../controllers/specs.controller");
const { authorization } = require("../middleware/auth");

const router = express.Router();

router
  .route("/")
  .get(authorization(1, 2), validateGetSpecs, getSpecsController)
  .post(authorization(1), validateCreateSpecs, createSpecsController);

router
  .route("/:id")
  .get(authorization(1, 2), validateGetSpecsById, getSpecsByIdController)
  .put(authorization(1), validateUpdateSpecs, updateSpecsController)
  .delete(authorization(1), validateDeleteSpecs, deleteSpecsController);

module.exports = router;
