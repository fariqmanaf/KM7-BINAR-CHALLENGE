const express = require("express");
const {
  validateGetOptions,
  validateGetOptionById,
  validateCreateOption,
  validateUpdateOption,
  validateDeleteOption,
} = require("../middleware/options");

const {
  getOptionsController,
  getOptionByIdController,
  createOptionController,
  updateOptionController,
  deleteOptionController,
} = require("../controllers/options.controller");
const { authorization } = require("../middleware/auth");

const router = express.Router();

router
  .route("/")
  .get(authorization(1, 2), validateGetOptions, getOptionsController)
  .post(authorization(1), validateCreateOption, createOptionController);

router
  .route("/:id")
  .get(authorization(1, 2), validateGetOptionById, getOptionByIdController)
  .put(authorization(1), validateUpdateOption, updateOptionController)
  .delete(authorization(1), validateDeleteOption, deleteOptionController);

module.exports = router;
