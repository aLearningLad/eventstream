const waitListController = require("../../controllers/attendee_controllers/waitlist_controller");
const ensureAuth = require("../../middleware/is_authenticated");

const router = require("express").Router();

router.post(
  "/api/v1/attendee/join-waiting-list",
  ensureAuth,
  waitListController
);

module.exports = { joinWaitingListRoute: router };
