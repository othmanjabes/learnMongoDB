const express = require("express");
const p = require("../services/productService");

const router = express.Router();
const {
  getProductValidator,
  createProductValidator,
  deleteProductValidator,
  updateProductValidator,
} = require("../utils/Validators/productValidator");


router
  .route("/")
  .get(p.getProducts)
  .post(createProductValidator, p.createProduct);
router
  .route("/:id")
  .get(getProductValidator, p.getProduct)
  .put(updateProductValidator, p.updateProduct)
  .delete(deleteProductValidator, p.deleteProduct);
module.exports = router;
