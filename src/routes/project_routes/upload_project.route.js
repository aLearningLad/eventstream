const db_client = require("../../config/postgresql/client");
const mongo = require("../../config/mongodb/database/db");
const mongo_model = require("../../config/mongodb/models/event");
const generateKey = require("../../utils/generate_key");

const router = require("express").Router();
const cryptoKey = generateKey();

router.post("/api/v1/new-project", async (req, res) => {
  // ----- collect all info
  const {
    company_name,
    organizer_id,
    title,
    description,
    location,
    start_time,
    end_time,
    price,
    capacity,
    date,
    images,
    tags,
    type,
  } = req.body;
  // ----- collect all info

  // -----account for missing info
  if (
    !company_name ||
    !organizer_id ||
    !title ||
    !description ||
    !location ||
    !start_time ||
    !end_time ||
    !price ||
    !capacity ||
    !date ||
    !tags ||
    !type
  ) {
    return res.status(401).json({ message: "Required fields are missing" });
  }
  // -----account for missing info

  // ------------ call producers ---------------
  try {
    // 1. postgreSQL -> events table -> return event_id
    const db = db_client;
    const { data: event_id_data, error: event_id_data_error } = await db
      .from("events")
      .insert({
        organizer_id,
        title,
        description,
        location,
        start_time,
        end_time,
        price,
        capacity,
        date,
      })
      .select("event_id");

    if (event_id_data_error) throw new Error(event_id_data_error.message);
    const event_id = await event_id_data[0].event_id;
    // 1. postgreSQL -> events table -> return event_id

    // 2. upload mongo_db metadata
    const s3_key = `${company_name}/${cryptoKey}-${organizer_id}`;
    const doc = new mongo_model({
      description: description,
      event_id,
      s3_key,
      tags,
      type,
      uploaded_by: organizer_id,
    });

    const mongo_result = await doc.save();

    const mongo_id = await mongo_result._id;

    // 3. aws upload

    // -------------- call producers ----------------

    res.status(200).json({ message: "Yessir, this endpoint works!" });
  } catch (error) {
    console.error("An error occured while uploading project: ", error);
    return res.status(500).json({ message: "Unable to upload event details" });
  }
});

module.exports = { uploadProjectRoute: router };
