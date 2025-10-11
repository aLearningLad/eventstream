const router = require("express").Router();
const sqldb = require("../../config/postgresql/client");
const mongoose = require("mongoose");
const aws = require("../../config/aws/s3_client");
const metadata_model = require("../../config/mongodb/models/event");
const { GetObjectCommand } = require("@aws-sdk/client-s3");

const postgresql = sqldb;
const s3_client = aws;

router.get("/api/v1/event/:event_id", async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "No request payload found" });
  }
  const { event_id } = req.params;
  const { organizer_id, company_name } = req.body;

  if (!event_id) {
    return res.status(400).json({ message: "No event id found in params" });
  }

  if (!organizer_id || !company_name) {
    console.error("Missing fields");
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    // 1. fetch postresql data ---> events, waitlist, events_metadata_links
    // 1. event(via organizer_id and event_id) + event_metadata_links + waitlist + tickets together via event_id
    const { data: combined_sql_data, error: combined_sql_data_error } =
      await postgresql
        .from("events")
        .select(`*, event_metadata_links(*), waitlist(*), tickets(*)`)
        .eq("event_id", event_id);

    if (combined_sql_data_error) {
      throw new Error(combined_sql_data_error);
    }

    if (combined_sql_data.length === 0) {
      return res
        .status(200)
        .json({ message: "No relevant data found for this event nor user" });
    }

    const mongo_id = await combined_sql_data[0].event_metadata_links[0]
      .mongo_id;

    // 2. fetch mongo metadata
    const doc = await metadata_model.findById(mongo_id);

    // 3. fetch aws s3 media
    const bucket_name = process.env.AWS_S3_BUCKET_NAME;
    const s3_key = await combined_sql_data[0].event_metadata_links[0].s3_key;
    const result = await s3_client.send(
      new GetObjectCommand({
        Bucket: bucket_name,
        Key: s3_key,
      })
    );

    const raw_data = await result.Body.transformToString();
    const base64image = Buffer.from(raw_data).toString("base64");

    return res.status(200).json({
      success: "Data found",
      core_event_data: combined_sql_data,
      metadata: doc,
      media_files: `data:image/jpeg;base64,${base64image}`,
    });
  } catch (error) {
    console.error("Unable to fetch project data: ", error);
    return res.status(500).json({ message: "Unable to fetch project data" });
  }
});

module.exports = { retrieveProjectRoute: router };
