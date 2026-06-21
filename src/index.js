const express = require("express");
const connectDB = require("./config/db");
const envObj = require("./config/env");
const productRoute = require("./routes/product");
const authRoute = require("./routes/auth");
const cors = require("cors");
const { transporter, testTransporter } = require("./utils/mailer");


const server = express();
server.use(express.json());

server.use(cors({origin:["http://localhost:5173", "http://localhost:5174"]}));
server.use("/api/v1/product", productRoute);
server.use("/api/v1/auth", authRoute);

server.get("/", (req, res) => {
  res.send("hello welcome to our server");
});

const port = envObj.port;

connectDB();
testTransporter();




server.listen(port, () => {
  console.log("April node server is ruining on port 4000");
});
