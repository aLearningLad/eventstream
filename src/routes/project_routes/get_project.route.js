const router = require("express").Router();
const sqldb = require("../../config/postgresql/client");
const mongoose = require("mongoose");
const aws = require("../../config/aws/s3_client");

const postgresql = sqldb;

router.get("/api/v1/event/:event_id", async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "No request payload found" });
  }
  const { event_id } = req.params;
  const { user_id, organizer_id } = req.body;

  if (!event_id) {
    return res.status(400).json({ message: "No event id found in params" });
  }

  if (!organizer_id) {
    console.error("Missing fields");
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    // 1. fetch postresql data ---> events, waitlist, events_metadata_links
    // 1. event(via organizer_id and event_id) + event_metadata_links + waitlist + tickets together via event_id
    const { data: combined_sql_data, error: combined_sql_data_error } =
      await postgresql
        .from("events")
        .select(`*, event_metadata_links(*), waitlist(*), tickets(*)`);

    if (combined_sql_data_error) {
      throw new Error(combined_sql_data_error);
    }

    // 2. fetch mongo metadata

    // 3. fetch aws s3 media

    console.log("The requested data here: ", combined_sql_data);
    res.status(200).json({ success: "Data found" });
  } catch (error) {
    console.error("Unable to fetch project data: ", error);
    return res.status(500).json({ message: "Unable to fetch project data" });
  }
});

module.exports = { retrieveProjectRoute: router };
