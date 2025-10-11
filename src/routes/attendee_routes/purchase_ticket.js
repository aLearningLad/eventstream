const router = require("express").Router();

router.post("/api/v1/attendee/buy-ticket", async (req, res) => {
  res.status(200).json({ success: "Ticket purchased!" });
});

module.exports = { attendeePurchaseTicketRoute: router };
