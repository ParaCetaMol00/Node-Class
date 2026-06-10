const Product = require("../models/product");
const User = require("../models/auth");
const { cloudinary } = require("../config/cloudinary");

const createProduct = async (req, res) => {
  console.log(req.user, "from create product function");

  console.log(req.file)

  try {
    if (req.user.role !== "admin") {
      return res.status(401).json({ status: false, message: "Access Denied" });
    }
    const { title, description, price } = req.body;
    console.log(req.body);

    if (!title || !description || !price || !req.file) {
      return res
        .status(400)
        .json({ status: false, message: "All field is required" });
    }
    const user = await User.find();

    // const product = await Product.create({
    //   ...req.body,
    //   userId: req.user.userID,
    // });

    // return res.status(201).json({
    //   status: true,
    //   message: "PRoduct create Successfully",
    //   product: product,
    //   length: product.length,
    // });
    const stream = cloudinary.uploader.upload_stream(
      { folder: "april-Product" },
      async (error, result) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ message:"Cloudinary upload failed" });
        }
        console.log(result, "from cloudinary");
        const product ={
          ...req.body,
          image: result.secure_url,
          imageId: result.public_id,
          userId: req.user.userID,
        };

        await Product.create(product);

        if (product) {
          return res.status(201).json({
            message: "Product created Successfully",
            product,
          });
        }
      }
    );

    stream.end(req.file.buffer);

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: false, message: error.message });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const product = await Product.find();

    return res.status(201).json({
      status: true,
      message: "Get product Successfully",
      product: product,
      length: product.length,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: false, message: error.message });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "Product not Found" });
    }

    // const productDTO = {
    //   title: product.title,
    //   price: product.price,
    // };

    return res.status(200).json({
      status: true,
      message: "Product fetch Successfully",
      // product: productDTO,
      product,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: false, message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).json({ status: false, message: "Access Denied" });
    }

    const { id } = req.params;
    const product = await Product.findById(id);
    // const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "Product not Found" });
    }
    console.log(product.userId.toString(), "from product");
    console.log(req.user.userID, "from token");
    if (product.userId.toString() !== req.user.userID) {
      return res.status(401).json({ status: false, message: "Access Denied" });
    }

    await Product.deleteOne({ _id: id });

    return res.status(200).json({
      status: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: false, message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
    });

    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "Product not Found" });
    }

    return res.status(200).json({
      status: true,
      message: "Product Updated Successfully",
      // product: productDTO,
      product,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
};
