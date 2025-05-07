/* const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const listEndpoints = require("express-list-endpoints");

const endpoints = listEndpoints(app);
exports.endpointsCollection = async (req, res) => {
  // Make sure the documentation folder exists
  const outputDir = path.join(__dirname, "../documentation");
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
};
 */
