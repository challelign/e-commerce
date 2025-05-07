const app = require("./app");
const fs = require("fs");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const connectDatabase = require("./config/database");

const dotenv = require("dotenv");

const cloudinary = require("cloudinary");

// auto-generate endpoints
const listEndpoints = require("express-list-endpoints");

const endpoints = listEndpoints(app);

//STEP ONE TO EXPORT ENDPOINT COLLECTION
// you cannot create controller for this because it is not generate all the endpoints
app.get("/api/v1/endpoints", (req, res) => {
  // Make sure the documentation folder exists
  const outputDir = path.join(__dirname, "documentation");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const filePath = path.join(outputDir, "endpoints.json");

  // Save to JSON file inside documentation folder
  fs.writeFileSync(filePath, JSON.stringify(endpoints, null, 2));

  console.log("API Endpoints exported to documentation/endpoints.json");
  res.json({
    message: "API Endpoints exported to documentation/endpoints.json",
    endpoints: endpoints,
  });
});

// STEP TWO TO EXPORT ENDPOINT COLLECTION TO POSTMAN COLLECTION FORMAT

const postmanRoute = require("./routes/postmanEndpointsRoute");
app.use("/api/v1/postman", postmanRoute);

// SWAGGER DOCUMENTATION USING POSTMAN COLLECTION .JSON FILE

/* const swaggerDocumentation = JSON.parse(
  fs.readFileSync("./documentation/openAi.json", "utf-8")
); */

const filePath = path.join(__dirname, "documentation/openAi.json");

if (!fs.existsSync(filePath)) {
  console.error("File not found at:", filePath);
  process.exit(1); // Stop the app if needed
}

const swaggerDocumentationContent = JSON.parse(
  fs.readFileSync(filePath, "utf-8")
);
console.log("Current working directory:", process.cwd());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocumentationContent)
);

app.get("/", (req, res) => {
  res.json("Welcome to the E-commerce API documentation");
});
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Handle Uncaught exception
process.on("uncaughtException", (err) => {
  // console.log(`ERROR: ${err.message}`);
  console.log(`ERROR: ${err.stack}`);

  console.log("Shutting down due to uncaughtException   exception ");

  process.exit(1);
});

// setting up config file
// if (process.env.NODE_ENV !== "PRODUCTION")
//   require("dotenv").config({ path: "backend/config/config.env" });

dotenv.config({ path: "backend/config/config.env" });

// connecting to database
connectDatabase();

//setting up cloudinary configur

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT :${process.env.PORT} in ${process.env.NODE_ENV} mode .`
  );
});

// Handle unHandled  Promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down the server due to Unhandled Promise rejection");
  server.close(() => {
    //this call const server
    process.exit(1);
  });
});
