const brandModel = require("../models/brandModel");
const factory = require("./hundlersFactory");


// @disc Get list of brand
// @route Get /brand
// @access public
exports.getBrand = factory.getAll(brandModel);

// @ disc   Get spicefic brand
// @ route  GET /brand/:id
// @ access public
exports.getBrands = factory.getOne(brandModel);

// @disc create brand
// @route POST /api/v1/brand
// @access Private
exports.createBrand = factory.createOne(brandModel);
// @ disc   update specific brand
// @ route  PUT brand/:id
// @ access Private
exports.updateBrand = factory.updateOne(brandModel);

// @ disc   Delete specific brand
// @ route  DELETE /brand/:id
// @ access Private
exports.deleteBrand = factory.deleteOne(brandModel);
