const router = require("express").Router();
const purchaseController = require("../../controllers/attendee_controllers/purchase_controller");
const app_limiter = require("../../middleware/app_limiter");
const ensureAuth = require("../../middleware/is_authenticated");

router.post(
  "/api/v1/attendee/buy-ticket/:event_id",
  ensureAuth,
  app_limiter,
  purchaseController
);

module.exports = { attendeePurchaseTicketRoute: router };
