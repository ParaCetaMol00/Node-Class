const express = require("express");
const { registerUser, loginUser, verifyEmail, resendVerification } = require("../controllers/auth");
const { registerValidator, loginValidator } = require("../validators/auth");

const router = express.Router();

router.post("/register", registerValidator, registerUser);
router.post("/login", loginValidator, loginUser);
router.get("/verify-email/:token", verifyEmail);
router.post("/resend-verification", resendVerification);

module.exports = router;