const db_client = require("../../config/postgresql/client");
const mongo = require("../../config/mongodb/database/db");
const mongo_model = require("../../config/mongodb/models/event");

const router = require("express").Router();

router.post("/api/v1/new-project", async (req, res) => {
  // ----- collect all info
  const {
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
  } = req.body;
  // ----- collect all info

  // -----account for missing info
  if (
    !organizer_id ||
    !title ||
    !description ||
    !location ||
    !start_time ||
    !end_time ||
    !price ||
    !capacity ||
    !date
  ) {
    throw new Error("Required fields are missing");
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

    if (event_id_data_error) throw new Error(event_id_data_error.details);
    const event_id = await event_id_data[0].event_id;
    // 1. postgreSQL -> events table -> return event_id

    // 2. upload mongo_db metadata
    // const s3_key =  ----> RESUME FROM HERE!!
    const doc = new mongo_model({
      description: description,
      event_id,
      s3_key,
    });

    // ------------ call producers ----------------

    res.status(200).json({ message: "Yessir, this endpoint works!" });
  } catch (error) {
    console.error("An error occured while uploading project: ", error);
    return res.status(500).json({ message: "Unable to upload event details" });
  }
});

module.exports = { uploadProjectRoute: router };
