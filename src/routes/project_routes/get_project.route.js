const router = require("express").Router();

router.get("/api/v1/event/:event-id", async (req, res) => {
  const { event_id } = req.params;

  if (!event_id) {
    return res.status(400).json({ message: "No event id found in params" });
  }

  res.status(200).json({ success: `Event ID from params is ${event_id}` });
});

module.exports = { retrieveProjectRoute: router };
