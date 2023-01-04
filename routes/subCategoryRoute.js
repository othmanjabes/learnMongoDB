const express = require("express");
const {
  createSubCategory,
  getSubCategory,
  getAllSubCategory,
  updatesubCategory,
  deletesubCategory,
  setCategoryIdToBody,
  filterSubCategory
} = require("../services/subCategoryService");
const {
  createSubCategoryValidator,
  deleteSubCategoryValidator,
  updateSubCategoryValidator,
} = require("../utils/Validators/subCategoryValidator");

// mergeParam: Allow us to access parametrs from other routers
//ex: we need to access categoryID form category router
const router = express.Router({mergeParams:true});


router
  .route("/")
  .post(setCategoryIdToBody,createSubCategoryValidator, createSubCategory)
  .get(filterSubCategory,getAllSubCategory);
router
  .route("/:id")
  .get(getSubCategory)
  .put(updateSubCategoryValidator, updatesubCategory)
  .delete(deleteSubCategoryValidator, deletesubCategory);
module.exports = router;
