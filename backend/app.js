const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");

const bodyparser = require("body-parser");
const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

const errorMiddleware = require("./middlewares/errors");


/*if (process.env.NODE_ENV !== "PRODUCTION")
  require("dotenv").config({ path: "backend/config/config.env" });*/


// setting up config file
// if (process.env.NODE_ENV !== "PRODUCTION")
//   require("dotenv").config({ path: "backend/config/config.env" });

dotenv.config({ path: "backend/config/config.env" });

//original
/*app.use(express.json());

app.use(bodyparser.urlencoded({ extended: true }));*/
//original end




// start fixing "413 Request Entity Too Large" errors
/*
app.use(express.json({limit: "100mb", extended: true}))
app.use(express.urlencoded({limit: "100mb", extended: true, parameterLimit: 500000}))
*/



/*
app.use(express.json({limit: '50mb'}));
app.use(bodyparser.json({ limit: "200mb" }));
app.use(bodyparser.urlencoded({ limit: "200mb",  extended: true, parameterLimit: 1000000 }));
*/


app.use(express.json({limit: '50mb'}));
app.use(bodyparser.json({ limit: "200mb" }));
app.use(bodyparser.urlencoded({ limit: "200mb",  extended: true, parameterLimit: 1000000 }));

//end fixing 413

// app.use(express.json());
// app.use(bodyparser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(fileUpload());
// Import all routes

const products = require("./routes/product");
const auth = require("./routes/auth");

const payment = require("./routes/payment");

const order = require("./routes/order");

app.use("/api/v1", products);

app.use("/api/v1", auth);
app.use("/api/v1", payment);

app.use("/api/v1", order);

// Middleware to handler error
app.use(errorMiddleware);

module.exports = app;
