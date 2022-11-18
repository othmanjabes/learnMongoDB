const slugify = require("slugify");
const asyncHundler = require("express-async-handler");
const subCategoryModel = require("../models/subCategoryModel");

// @disc: middleware for vreate subCategory
exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryid;
  next();
};

exports.filterSubCategory = (req, res, next) => {
  let filterCategory = {};
  if (req.params.categoryid) {
    filterCategory =  { category: req.params.categoryid };
  }
  req.filterCat = filterCategory;
  next();
};

// @disc create subCategory
// @route POST /subCategory
// @access Private
exports.createSubCategory = asyncHundler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await subCategoryModel.create({
    name,
    category,
    slug: slugify(name),
  });
  res.status(201).json({ data: subCategory });
});

// @ disc   Get spicefic category
// @ route  GET /subCategory/:id
// @ access public
exports.getSubCategory = asyncHundler(async (req, res) => {
  const { id } = req.params;
  const subCategory = await subCategoryModel.findById(id);
  if (subCategory === null) {
    res.status(404).json({ msg: "NOO sub category found" });
  }
  res.status(200).json({ data: subCategory });
});

// Nested Route
// Get /category/:categoryID/subcategory

// @disc Get list of subSategory
// @route Get /subCategory
// @access public
exports.getSubCategory = asyncHundler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const subSategory = await subCategoryModel
    .find(req.filterCat)
    .skip(skip)
    .limit(limit);
  //this line converte id to name of id: 54894546dsf5 => name
  //.populate({ path: "category", select: "name" });
  res.status(200).json({ result: subSategory.length, page, data: subSategory });
});

// @ disc   update specific subCategory
// @ route  PUT /subCategory/:id
// @ access Private
exports.updatesubCategory = asyncHundler(async (req, res) => {
  const { id } = req.params;
  const { name, category } = req.body;
  const subCategory = await subCategoryModel.findByIdAndUpdate(
    { _id: id },
    { name: name, slug: slugify(name), category },
    { new: true }
  );
  if (!subCategory) {
    res.status(404).json({ msg: "NO subCategory found !>?!?!?<!" });
  }
  res.status(200).json({ data: subCategory });
});

// @ disc   Delete specific subCategory
// @ route  DELETE /subCategory/:id
// @ access Private
exports.deletesubCategory = asyncHundler(async (req, res) => {
  const { id } = req.params;
  const subCategory = await subCategoryModel.findByIdAndDelete(id);
  if (!subCategory) {
    res.status(404).json({ msg: "NO subCategory found !>?!?!?<!" });
  }
  res.status(200).json({ msg: "Success ddeleted subCategory" });
});
