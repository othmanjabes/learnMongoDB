const CategoryModel = require("../models/categoryModel");
const factory = require("./hundlersFactory");

// @disc Get list of category
// @route Get /Category
// @access public
exports.getCategories = factory.getAll(CategoryModel);

// @ disc   Get spicefic category
// @ route  GET /Category/:id
// @ access public
exports.getCategory = factory.getOne(CategoryModel);

// @disc create category
// @route POST /categories
// @access Private
exports.createCategory = factory.createOne(CategoryModel);
// @ disc   update specific category
// @ route  PUT /categories/:id
// @ access Private
exports.updateCategory = factory.updateOne(CategoryModel);

// @ disc   Delete specific category
// @ route  DELETE /categories/:id
// @ access Private

exports.deleteCategory = factory.deleteOne(CategoryModel);
