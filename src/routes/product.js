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

route.post("/", tokenVerification, upload.single("image"), createProduct);
route.get("/", getAllProduct);
route.post("/:id", getSingleProduct);
route.delete("/:id", tokenVerification, isAdmin, deleteProduct);
route.put("/:id", tokenVerification, isAdmin, updateProduct);

module.exports = route;
