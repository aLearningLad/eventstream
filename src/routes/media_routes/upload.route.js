const postMedia = require("../../controllers/media_controllers/post_media");
const app_limiter = require("../../middleware/app_limiter");

const router = require("express").Router();

router.post("/api/v1/new-media", app_limiter, postMedia);

module.exports = { uploadNewMediaRoute: router };
