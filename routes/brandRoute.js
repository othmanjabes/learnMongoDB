const express = require("express");
const brand = require("../services/brandService");

const router = express.Router();
const {
  getBrandValidator,
  createBrandValidator,
  deleteBrandValidator,
  updateBrandValidator,
} = require("../utils/Validators/brandValidator");

router
  .route("/")
  .get(brand.getBrand)
  .post(createBrandValidator, brand.createBrand);
router
  .route("/:id")
  .get(getBrandValidator, brand.getBrands)
  .put(updateBrandValidator, brand.updateBrand)
  .delete(deleteBrandValidator, brand.deleteBrand);
module.exports = router;
