const ensureAuth = require("../../middleware/is_authenticated");
const db_client = require("../../config/postgresql/client");
const db = db_client;

const router = require("express").Router();

router.post(
  "/api/v1/attendee/join-waiting-list",
  ensureAuth,
  waitListController
);

module.exports = { joinWaitingListRoute: router };
