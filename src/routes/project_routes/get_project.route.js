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
    console.error("Missing fields");
    return res.status(400).json({ message: "Missing fields" });
  }

  // 1. fetch postresql data ---> events, waitlist, events_metadata_links

  // 2. fetch mongo metadata

  // 3. fetch aws s3 media
});

module.exports = { retrieveProjectRoute: router };
