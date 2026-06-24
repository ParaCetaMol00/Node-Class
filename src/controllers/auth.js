const crypto = require("crypto");
const { sendEmail } = require("../utils/mailer");
const generateVerificationToken = require("../utils/generateVerificationToken");

const { validationResult } = require("express-validator");
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
    // generate verification token
    const { rawToken, hashedToken } = generateVerificationToken();

    // creating user in the database
    await User.create({
      ...req.body,
      password: hashedPassword,
      verificationToken: hashedToken,
      verificationTokenExpires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    // send verification email (don't fail registration if email fails)
    const verificationLink = `${envObj.clientUrl}/verify-email/${rawToken}`;
    try {
      await sendEmail({
        to: email,
        subject: "Verify your email",
        html: `<p>Hi ${name},</p>
               <p>Please verify your email by clicking the link below:</p>
               <a href="${verificationLink}">Verify Email</a>
               <p>This link expires in 24 hours.</p>`,
      });
    } catch (emailError) {
      console.log("Email send failed:", emailError.message);
    }

    // creating user object with the password for response
    const user = {
      email,
      name,
      gender,
    };

    // Returning a successful message to users
    return res.status(201).json({
      status: true,
      message: "User created. Please check your email to verify your account.",
      user,
    });

  } catch (error) {
    console.log(error.message);
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


const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      verificationToken: hashedToken,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Verification link is invalid or has expired",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    return res.status(200).json({
      status: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: false, message: error.message });
  }
};

const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ status: false, message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ status: false, message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ status: false, message: "Email is already verified" });
    }

    const { rawToken, hashedToken } = generateVerificationToken();

    user.verificationToken = hashedToken;
    user.verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    const verificationLink = `${envObj.clientUrl}/verify-email/${rawToken}`;

    await sendEmail({
      to: user.email,
      subject: "Verify your email",
      html: `<p>Hi ${user.name},</p>
             <p>Please verify your email by clicking the link below:</p>
             <a href="${verificationLink}">Verify Email</a>
             <p>This link expires in 24 hours.</p>`,
    });

    return res.status(200).json({
      status: true,
      message: "Verification email resent successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: false, message: error.message });
  }
};
  module.exports = { registerUser, loginUser, verifyEmail, resendVerification };
