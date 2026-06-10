const jwt = require("jsonwebtoken");
const envObj = require("../config/env");
const tokenVerification = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ status: false, message: "Token not Found" });
  }
  console.log("Autheader: ", authHeader);

  const token = authHeader.split(" ")[1];

  console.log("Token: ", token);

  try {
    const decoded = jwt.verify(token, envObj.jwt_secret);
    console.log("Decoded: ", decoded);
    if (decoded) {
      req.user = decoded;
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ status: false, message: error.message });
  }
};

module.exports = tokenVerification;
