const dotenv = require("dotenv");
dotenv.config();

const envObj = {
  mongodbUrl: process.env.MONGO_URI,
  port: process.env.PORT,
  salt: process.env.SALT,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expireIn: process.env.JWT_EXPIRE_IN,
  cloud_name: process.env.CLOUD_NAME,
  cloud_api_key: process.env.CLOUD_API_KEY,
  cloud_api_secret: process.env.CLOUD_API_SECRET,
};

module.exports = envObj;
