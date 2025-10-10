const multer = require("multer");
const ensureAuth = require("../../middleware/is_authenticated");
const postProjectController = require("../../controllers/project_controllers/post_project");
const express = require("express");
const app_limiter = require("../../middleware/app_limiter");
const upload = multer();
const router = express.Router();

router.post(
  "/api/v1/new-project",
  ensureAuth,
  app_limiter,
  upload.single("images"),
  postProjectController
);

module.exports = { uploadProjectRoute: router };
