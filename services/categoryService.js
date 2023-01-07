const multer = require("multer");

const { v4: uuidv4 } = require('uuid');

const CategoryModel = require("../models/categoryModel");
const factory = require("./hundlersFactory");

const multerStorge = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const filename = `category-${uuidv4()}-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: multerStorge });
exports.uploadCategoryImage = upload.single("image");

// @disc Get list of categoryt
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
