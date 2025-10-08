const express = require("express");
const postMetadata = require("../../controllers/metadata_controllers/post_metadata");
const ensureAuth = require("../../middleware/is_authenticated");
const router = express.Router();

router.post("/api/v1/metadata", ensureAuth, postMetadata);

module.exports = { uploadMetadataRoute: router };
