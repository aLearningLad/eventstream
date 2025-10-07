const express = require("express");
const eventToKafka = require("../../controllers/event_controllers/post_event");

const router = express.Router();

router.post("/api/v1/event", eventToKafka);

module.exports = { uploadEventRoute: router };
