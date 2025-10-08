const express = require("express");
const postEvent = require("../../controllers/event_controllers/post_event");

const router = express.Router();

router.post("/api/v1/event", postEvent);

module.exports = { uploadEventRoute: router };
