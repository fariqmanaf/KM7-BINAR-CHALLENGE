const express = require("express");

const {
  validateGetManufactures,
  validateGetManufactureById,
  validateCreateManufacture,
  validateUpdateManufacture,
  validateDeleteManufactureById,
} = require("../middleware/manufacture.middleware");
const {
  getManufactures,
  getManufactureById,
  createManufacture,
  updateManufacture,
  deleteManufactureById,
} = require("../controllers/manufacture.controller");
const { authorization } = require("../middleware/auth");

const router = express.Router();

router
  .route("/")
  .get(authorization(1, 2), validateGetManufactures, getManufactures)
  .post(authorization(1), validateCreateManufacture, createManufacture);

router
  .route("/:id")
  .get(authorization(1, 2), validateGetManufactureById, getManufactureById)
  .put(authorization(1), validateUpdateManufacture, updateManufacture)
  .delete(
    authorization(1),
    validateDeleteManufactureById,
    deleteManufactureById
  );

module.exports = router;
