const productModel = require("../models/productModel");
const factory = require("./hundlersFactory");

// @disc Get list of product
// @route Get /product
// @access public
exports.getProducts = factory.getAll(productModel,"Products"); 

// @ disc   Get spicefic product
// @ route  GET /product/:id
// @ access public
exports.getProduct = factory.getOne(productModel);

// @disc create product
// @route POST /products
// @access Private
exports.createProduct = factory.createOne(productModel);

// @ disc   update specific product
// @ route  PUT /products/:id
// @ access Private
exports.updateProduct = factory.updateOne(productModel);

// @ disc   Delete specific product
// @ route  DELETE /categories/:id
// @ access Private
exports.deleteProduct = factory.deleteOne(productModel);
