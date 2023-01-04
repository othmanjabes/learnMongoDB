const slugify = require("slugify");
const asyncHundler = require("express-async-handler");
const subCategoryModel = require("../models/subCategoryModel");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("./hundlersFactory");

// @disc: middleware for vreate subCategory
exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryid;
  next();
};

exports.filterSubCategory = (req, res, next) => {
  let filterCategory = {};
  if (req.params.categoryid) {
    filterCategory = { category: req.params.categoryid };
  }
  req.filterCat = filterCategory;
  next();
};

// Nested Route
// Get /category/:categoryID/subcategory

// @disc Get list of subSategory
// @route Get /subCategory
// @access public
exports.getAllSubCategory = factory.getAll(subCategoryModel); 

// @ disc   Get spicefic category
// @ route  GET /subCategory/:id
// @ access public
exports.getSubCategory = factory.getOne(subCategoryModel);

// @disc create subCategory
// @route POST /subCategory
// @access Private
exports.createSubCategory = factory.createOne(subCategoryModel);

// @ disc   update specific subCategory
// @ route  PUT /subCategory/:id
// @ access Private
exports.updatesubCategory = factory.updateOne(subCategoryModel);

// @ disc   Delete specific subCategory
// @ route  DELETE /subCategory/:id
// @ access Private
exports.deletesubCategory = factory.deleteOne(subCategoryModel);
