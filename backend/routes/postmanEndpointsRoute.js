const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Adjust this path to the actual JSON file with endpoint list
// const endpoints = require("../documentation/endpoints.json");
const endpointsPath = path.join(__dirname, "../documentation/endpoints.json");

let endpoints = null;
if (fs.existsSync(endpointsPath)) {
  endpoints = require(endpointsPath);
} else {
  console.error("endpoints.json not found");
  // You can also return an error or fallback response here
}

router.get("/", (req, res) => {
  const collection = {
    info: {
      name: "Generated API Collection",
      schema:
        "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
    },
    item: [],
  };

  endpoints.forEach((ep) => {
    ep.methods.forEach((method) => {
      collection.item.push({
        name: `${method} ${ep.path}`,
        request: {
          method,
          header: [],
          url: {
            raw: `{{base_url}}${ep.path}`,
            host: ["{{base_url}}"],
            path: ep.path.split("/").filter(Boolean),
          },
        },
      });
    });
  });

  // Optional: save the collection to disk (comment this out if not needed)
  const outputDir = path.join(__dirname, "../documentation/");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const filePath = path.join(outputDir, "postman_endpoints.json");
  fs.writeFileSync(filePath, JSON.stringify(collection, null, 2));

  console.log("✅ Postman endpoints generated!");
  res.json(collection); // Send it back to Postman or browser
});

module.exports = router;
