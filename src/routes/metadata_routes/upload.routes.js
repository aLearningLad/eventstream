const express = require("express");
const postMetadata = require("../../controllers/metadata_controllers/post_metadata");
const ensureAuth = require("../../middleware/is_authenticated");
const app_limiter = require("../../middleware/app_limiter");
const router = express.Router();

router.post("/api/v1/metadata", ensureAuth, app_limiter, postMetadata);

module.exports = { uploadMetadataRoute: router };
