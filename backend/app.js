const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");

const bodyparser = require("body-parser");
const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");

const errorMiddleware = require("./middlewares/errors");
if (process.env.NODE_ENV !== "PRODUCTION")
  require("dotenv").config({ path: "backend/config/config.env" });

app.use(express.json());

app.use(bodyparser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(fileUpload());
// Import all routes

const products = require("./routes/product");
const auth = require("./routes/auth");
const order = require("./routes/order");

app.use("/api/v1", products);

app.use("/api/v1", auth);

app.use("/api/v1", order);

// Middleware to handler error
app.use(errorMiddleware);

module.exports = app;
