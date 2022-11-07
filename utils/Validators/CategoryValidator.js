const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware.js");

exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleware,
];

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("this fiald is requird")
    .isLength({ min: 3 })
    .withMessage("no short 3")
    .isLength({ max: 32 })
    .withMessage("no long 32"),
  validatorMiddleware,
];

exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id to delete"),
  validatorMiddleware,
];

exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id to update"),
  validatorMiddleware,
];
