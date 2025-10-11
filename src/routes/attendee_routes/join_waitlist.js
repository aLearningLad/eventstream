const router = require("express").Router();

router.post("/api/v1/attendee/join-waiting-list", async (req, res) => {
  return res.status(200).json({ success: "waiting list route works!" });
});

module.exports = { joinWaitingListRoute: router };
