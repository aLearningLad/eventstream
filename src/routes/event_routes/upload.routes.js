const express = require("express");
const postEvent = require("../../controllers/event_controllers/post_event");
const ensureAuth = require("../../middleware/is_authenticated");

const router = express.Router();

router.post("/api/v1/event", ensureAuth, postEvent);

module.exports = { uploadEventRoute: router };
