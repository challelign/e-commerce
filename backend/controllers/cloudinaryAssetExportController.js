// controllers/cloudinaryController.js
const axios = require("axios");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "melodie";
const apiKey = process.env.CLOUDINARY_API_KEY || 258579369197963;
const apiSecret =
  process.env.CLOUDINARY_API_SECRET || "xe69iCQkFI4dBKX1yZx3ysAwpHE";

const fetchAllImages = async (nextCursor = null, allImages = []) => {
  const auth = {
    username: apiKey,
    password: apiSecret,
  };

  console.log("cloudName apiKey apiSecret", { cloudName, apiKey, apiSecret });
  let url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload?prefix=products/`;
  if (nextCursor) url += `?next_cursor=${nextCursor}`;

  try {
    const response = await axios.get(url, { auth });
    const { resources, next_cursor } = response.data;
    allImages.push(...resources);

    if (next_cursor) {
      return await fetchAllImages(next_cursor, allImages);
    }

    return allImages;
  } catch (err) {
    console.log("Error", err);
    throw new Error(`Failed to fetch images: ${err.message}`);
  }
};

exports.exportImages = async (req, res) => {
  try {
    const images = await fetchAllImages();

    // Ensure documentation folder exists
    const outputDir = path.join(__dirname, "../documentation");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const filePath = path.join(outputDir, "cloudinary_images.json");

    // Save JSON file to documentation folder
    fs.writeFileSync(filePath, JSON.stringify(images, null, 2));
    console.log("filePath", filePath);

    res.download(filePath); // Sends the file as a download
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/* exports.exportImages = async (req, res) => {
  try {
    const images = await fetchAllImages();
    const filePath = "cloudinary_images.json";

    fs.writeFileSync(filePath, JSON.stringify(images, null, 2));
    console.log("filePath", filePath);
    res.download(filePath); // sends the file as download
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; */
