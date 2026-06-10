const mongoose = require("mongoose");
const envObj = require("./env");

const connectDB = async () => {
  try {
    const db = await mongoose.connect(envObj.mongodbUrl);
    if (db) {
      console.log("Database Connected Successfully");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
