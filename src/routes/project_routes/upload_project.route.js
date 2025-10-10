const multer = require("multer");
const ensureAuth = require("../../middleware/is_authenticated");
const postProjectController = require("../../controllers/project_controllers/post_project");
const express = require("express");
const upload = multer();
const router = express.Router();

router.post(
  "/api/v1/new-project",
  ensureAuth,
  upload.single("images"),
  postProjectController
);

module.exports = { uploadProjectRoute: router };
