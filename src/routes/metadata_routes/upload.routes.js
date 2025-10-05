const express = require("express");
const postMetadata = require("../../controllers/metadata_controllers/post_metadata");

const router = express.Router();

router.post("/api/v1/metadata", postMetadata);

module.exports = { uploadMetadataRoute: router };
