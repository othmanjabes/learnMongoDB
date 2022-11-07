const express = require("express");
// const {getCategores,createCategory} = require("../services/categoryService")
const Cat = require("../services/categoryService");
const router = express.Router();
const {
  getCategoryValidator,
  createCategoryValidator,
  deleteCategoryValidator,
  updateCategoryValidator,
} = require("../utils/Validators/CategoryValidator");

router
  .route("/")
  .get(Cat.getCategories)
  .post(createCategoryValidator, Cat.createCategory);
router
  .route("/:id")
  .get(getCategoryValidator, Cat.getCategory)
  .put(updateCategoryValidator, Cat.updateCategory)
  .delete(deleteCategoryValidator, Cat.deleteCategory);
module.exports = router;
