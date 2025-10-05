const EventModel = require("../../config/mongodb/models/event");

const postMetadata = async (req, res) => {
  // destructure, pull out all values to be saved
  const { event_id, s3_key, type, tags, uploaded_by, description } = req.body;

  // alert client if any metadata fields are missing
  if (!event_id || !s3_key || !type || !tags || !uploaded_by || !description) {
    console.error("Metadata fields are incomplete");
    return res.status(400).json({ message: "Metadata fields are incomplete" });
  }

  try {
    // if no client omissions, send data to mongodb (later this becomes: from this route's controller, send as kafka producer TO kafka consumer)
    const newMetadata = new EventModel({
      description,
      event_id,
      s3_key,
      type,
      tags,
      uploaded_by,
    });

    await newMetadata.save();
    return res.status(201).json({ success: "New metadata entry saved" });
  } catch (error) {
    console.error(
      "An error occurred while trying to send metadata to MongoDB: ",
      error
    );
    return res
      .status(500)
      .json({ message: `An error occured while saving metadata` });
  }
};

module.exports = postMetadata;
