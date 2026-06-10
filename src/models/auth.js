const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is require"],
    trim: true,
    minlength: [3, "Name must be at least three Characters Long"],
  },

  email: {
    type: String,
    required: [true, "Email is require"],
    unique: [true, "email already Exist"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
    lowercase: true,
    trim: true,
  },
  dob: {
    type: Date,
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least Eight Characters Long"],
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

module.exports = mongoose.model("user", userSchema);
