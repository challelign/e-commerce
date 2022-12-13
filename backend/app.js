const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");

const bodyparser = require("body-parser");
const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

const path = require('path')


const errorMiddleware = require("./middlewares/errors");


// setting up config file


if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })
// comment the above to test locally and uncomment below code

// dotenv.config({ path: "backend/config/config.env" });



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

//start --> comment this code if you want to check localy

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}

//end



// Middleware to handler error
app.use(errorMiddleware);

module.exports = app;
