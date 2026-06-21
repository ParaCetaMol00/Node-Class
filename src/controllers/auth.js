const {validationResult} = require("express-validator"); 
const envObj = require("../config/env");
const User = require("../models/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());

    return res.status(400).json({ errors: errors.array()?.[0].msg });
  }


  try {
    // user input
    const { email, name, password, gender } = req.body;

    // checking the user input
    if (!email || !name || !password) {
      return res
        .status(400)
        .json({ status: false, message: "All fields  are required" });
    }

    // checking if the user exist before saving the user in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: false, message: "User Already Exist" });
    }

    // password hashing with bcrypt

    // generating salt for password hashing
    const salt = await bcrypt.genSalt(Number(envObj.salt));

    // Hashing the password with the salt will generate
    const hashedPassword = await bcrypt.hash(password, salt);

    // console.log(salt, "salt....");

    // console.log(hashedPassword);

    // creating user in the database
    await User.create({ ...req.body, password: hashedPassword, });

    // creating user object with the password for response
    const user = {
      email,
      name,
      gender,
    };

    // Returning a successful message to users
    return res
      .status(201)
      .json({ status: true, message: "user created successfully", user });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: true, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    // user input
    const { email, password } = req.body;

    // checking the user input
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "All fields  are required" });
    }

    // checking if the user exist before saving the user in the database
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credentials" });
    }
    // console.log(existingUser);

    const comparePassword = await bcrypt.compare(
      password,
      existingUser.password,
    );
    console.log(comparePassword);

    if (!comparePassword) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credentials" });
    }

    const user = {
      name: existingUser.name,
      email,
      gender: existingUser.gender,
    };

    const token = jwt.sign(
      { userID: existingUser._id, role: existingUser.role },
      envObj.jwt_secret,
      {
        expiresIn: envObj.jwt_expireIn,
      },
    );
    console.log("token:", token);

    return res
      .status(200)
      .json({ status: true, message: "login Successfully", user, token });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: true, message: error.message });
  }
};

module.exports = { registerUser, loginUser };
