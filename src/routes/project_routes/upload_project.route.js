const db_client = require("../../config/postgresql/client");

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
  } = req.body;

  // ----- collect all info

  // ------------ call producers ---------------
  try {
    // 1. postgreSQL -> events table -> return event_id
    const db = db_client();
    const { data: event_id_data, error: event_id_data_error } = await db
      .from("events")
      .insert({
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

    // ------------ call producers ----------------

    res.status(200).json({ message: "Yessir, this endpoint works!" });
  } catch (error) {}
});

module.exports = { uploadProjectRoute: router };
