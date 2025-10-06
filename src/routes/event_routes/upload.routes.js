const express = require("express");
const handleEventUpload = require("../../controllers/event_controllers/post_event");

const router = express.Router();

router.post("/api/v1/event", handleEventUpload);

module.exports = { uploadEventRoute: router };
