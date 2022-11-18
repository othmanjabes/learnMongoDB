const slugify = require("slugify");
const asyncHundler = require("express-async-handler");
const productModel = require("../models/productModel");

// @disc Get list of product
// @route Get /product
// @access public
exports.getProducts = asyncHundler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const products = await productModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ result: products.length, page, data: products });
});

// @ disc   Get spicefic product
// @ route  GET /product/:id
// @ access public
exports.getProduct = asyncHundler(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel.findById(id);
  if (product === null) {
    res.status(404).json({ msg: "NO product found!" });
  }
  res.status(200).json({ data: product });
});

// @disc create product
// @route POST /products
// @access Private
exports.createProduct = asyncHundler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const product = await productModel.create(req.body);
  res.status(201).json({ data: product });
});

// @ disc   update specific product
// @ route  PUT /products/:id
// @ access Private
exports.updateProduct = asyncHundler(async (req, res) => {
  const { id } = req.params;
  req.body.slug = slugify(req.body.title);
  const product = await productModel.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  }); 
  if (!product) {
    res.status(404).json({ msg: "NO product found!" });
  }
  res.status(200).json({ data: product });
});

// @ disc   Delete specific product
// @ route  DELETE /categories/:id
// @ access Private
exports.deleteProduct = asyncHundler(async (req, res) => {
  const { id } = req.params;
  const product = await productModel.findByIdAndDelete(id);
  if (!product) {
    res.status(404).json({ msg: "NO product found!" });
  }
  res.status(200).json({ msg: "Success ddeleted product" });
});
