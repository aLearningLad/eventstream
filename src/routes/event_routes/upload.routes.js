const express = require("express");
const postEvent = require("../../controllers/event_controllers/post_event");
const ensureAuth = require("../../middleware/is_authenticated");
const app_limiter = require("../../middleware/app_limiter");
const router = express.Router();

router.post(
  "/api/v1/event",
  app_limiter,

  // ensureAuth,

  postEvent
);

module.exports = { uploadEventRoute: router };
