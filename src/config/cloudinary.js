const envObj = require("./env");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");


cloudinary.config({
  cloud_name: envObj.cloud_name,
  api_key: envObj.cloud_api_key,
  api_secret: envObj.cloud_api_secret,
});

module.exports = {cloudinary};