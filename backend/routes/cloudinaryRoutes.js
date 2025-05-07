// routes/cloudinaryRoutes.js
const express = require("express");
const router = express.Router();
const {
  exportImages,
} = require("../controllers/cloudinaryAssetExportController");

router.get("/export-images", exportImages);

module.exports = router;
