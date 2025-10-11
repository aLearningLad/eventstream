const fetchProjectProducer = require("../../services/project/get_event/producer");

const router = require("express").Router();

router.get("/api/v1/event/:event_id", async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "No request payload found" });
  }
  const { event_id } = req.params;
  const { organizer_id } = req.body;

  if (!event_id) {
    return res.status(400).json({ message: "No event id found in params" });
  }

  if (!organizer_id) {
    return res.status(400).json({ message: "Missing fields" });
  }

  // pass event id to producer
  const result = await fetchProjectProducer({ event_id, organizer_id });

  if (result === 400) {
    return res.status(400).json({ message: "Unable to fetch event data" });
  }

  res.status(200).json({ success: "Event data retrieved" });
});

module.exports = { retrieveProjectRoute: router };
