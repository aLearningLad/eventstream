const postMedia = require("../../controllers/media_controllers/post_media");

const router = require("express").Router();

router.post("/api/v1/new-media", postMedia);

module.exports = { uploadMediaRoute: router };
