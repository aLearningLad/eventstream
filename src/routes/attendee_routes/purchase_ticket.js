const router = require("express").Router();

router.post("/api/v1/attendee/buy-ticket", async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "No payload sent with request" });
  }

  res.status(200).json({ success: "Ticket purchased!" });
});

module.exports = { attendeePurchaseTicketRoute: router };
