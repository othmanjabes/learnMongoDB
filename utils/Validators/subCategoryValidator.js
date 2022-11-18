const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");

exports.getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory id format"),
  validatorMiddleware
];

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("this fiald is requird")
    .isLength({ min: 3 })
    .withMessage("no short 3")
    .isLength({ max: 32 })
    .withMessage("no long 32"),
    check('category')
    .notEmpty().withMessage('must have Category parent')
    .isMongoId().withMessage('id is Invalid')
    ,
  validatorMiddleware
];

exports.deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory id to delete"),
  validatorMiddleware,
];

exports.updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory id to update"),
  validatorMiddleware
];
