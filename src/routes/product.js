const { body } = require("express-validator");
const {createProductValidator, updateProductValidator} = require("../validators/auth/index");


const express = require("express");
const {
  createProduct,
  getAllProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/product");
const tokenVerification = require("../middlewares/verify");
const isAdmin = require("../middlewares/isAdmin");
const {upload} = require("../utils/multer");

const route = express.Router();

route.post("/", tokenVerification, upload.single("image"), createProductValidator, createProduct);
route.get("/", getAllProduct);
route.get("/:id", getSingleProduct);
route.delete("/:id", tokenVerification, isAdmin, deleteProduct);
route.put("/:id", tokenVerification, isAdmin, updateProductValidator, updateProduct);

module.exports = route;
