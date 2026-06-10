const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is Required"],
    minlength: [5, "Title must be at least 5 characters"],
    maxlength: [50, "Title must not be longer than 50 Characters"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description  is Required"],
    minlength: [5, "Description must be at least 5 characters"],
    maxlength: [150, "Description must not be longer than 50 Characters"],
  },
  price: {
    type: Number,
    min: 100,
    required: true,
  },
  currency: {
    type: String,
    default: "NGN",
    enum: ["NGN", "USD", "AUD"],
  },

  category: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  image: {
    type: String,
  },
  imageId: {
    type: String,
  }
});

module.exports = mongoose.model("product", productSchema);
