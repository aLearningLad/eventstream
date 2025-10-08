const db_client = require("../../config/postgresql/client");
const eventToKafka = require("../../services/event/producer");

const postEvent = async (req, res) => {
  const db = db_client;

  // recieve body & destructure
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

  // fields missing
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
    console.error("Event fields are incomplete");
    return res.status(400).json({ message: "Fields are incomplete" });
  }

  try {
    const producerResponse = await eventToKafka({
      organizer_id,
      title,
      description,
      location,
      start_time,
      end_time,
      price,
      capacity,
      date,
    });

    if (producerResponse == 200) {
      return res.status(201).json({ success: "New event details entry saved" });
    } else {
      return res
        .status(500)
        .json({ message: "Unable to send event payload to Kafka" });
    }

    // BELOW GOES INTO PRODUCER
    // const { error: event_entry_error } = await db.from("events").insert({
    //   organizer_id,
    //   title,
    //   description,
    //   location,
    //   start_time,
    //   end_time,
    //   price,
    //   capacity,
    //   date,
    // });
    // if (event_entry_error) throw new Error(event_entry_error.details);
    // return res.status(200).json({ message: "details uploaded!" });
    // ABOVE COMMENTS GO INTO PRODUCER
  } catch (error) {
    console.error("Unable to upload event details: ", error);
    return res
      .status(500)
      .json({ message: "An error occured while uploading event details" });
  }
};

module.exports = postEvent;
