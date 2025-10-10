const db_client = require("../../config/postgresql/client");
const mongo_model = require("../../config/mongodb/models/event");
const generateKey = require("../../utils/generate_key");
const s3Client = require("../../config/aws/s3_client");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const projectEventToKafka = require("../../services/project/event_upload/producer");
const cryptoKey = generateKey();

const postProjectController = async (req, res) => {
  // no request body
  if (!req.body) {
    return res.status(400).json({ message: "Request body is missing" });
  }

  // no image file
  if (!req.file) {
    return res.status(400).json({ message: "Image file is missing" });
  }

  // gather values
  const {
    tags,
    type,
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
  const image_data = req.file.buffer;

  // ommissions
  if (
    !type ||
    !tags ||
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
    console.error("postProjectController: Missing fields from client");
    return res.status(400).json({ message: "Missing values from client" });
  }

  try {
    // call producer
    const result = await projectEventToKafka({
      type,
      tags,
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

    if (result === 400) {
      throw new Error("Missing fields from client");
    }

    if (result === 200) {
      return res.status(200).json({ success: "Payload sent to consumer" });
    }
  } catch (error) {
    console.error("Unable to send payload to kafka: ", error);
    return res.json(400).json({ message: "Unable to send fields to kafka" });
  }
};

module.exports = postProjectController;

// ref
// 1. postgreSQL -> events table -> return event_id
// const db = db_client;
// const { data: event_id_data, error: event_id_data_error } = await db
//   .from("events")
//   .insert({
//     organizer_id,
//     title,
//     description,
//     location,
//     start_time,
//     end_time,
//     price,
//     capacity,
//     date,
//   })
//   .select("event_id");

// if (event_id_data_error) throw new Error(event_id_data_error.message);
// const event_id = await event_id_data[0].event_id;
// END: 1. postgreSQL -> events table -> return event_id

// 2. upload mongo_db metadata
// const doc = new mongo_model({
//   description: description,
//   event_id,
//   s3_key,
//   tags,
//   type,
//   uploaded_by: organizer_id,
// });

// const mongo_result = await doc.save();

// const mongo_id = await mongo_result._id;

// END: 2. upload mongo_db metadata

// 3. aws upload
// const bucket_name = process.env.AWS_S3_BUCKET_NAME;
// const file_key = generateKey();
// await s3Client.send(
//   new PutObjectCommand({
//     Bucket: bucket_name,
//     Key: `${company_name}/${organizer_id}/image-${file_key}`,
//     Body: file.buffer,
//   })
// );

// END: 3. aws upload

// 4. postreSQL metatada_event_links table
// const { data: sql_metadata, error: sql_metadata_error } = await db_client
//   .from("event_metadata_links")
//   .insert({
//     event_id,
//     mongo_id,
//     s3_key,
//   });

// if (sql_metadata_error) {
//   console.error("Unable to upload metadata links: ", sql_metadata_error);
//   return res
//     .status(500)
//     .json({ message: "Unable to upload metadata links" });
// }

// -------------- call producers ----------------
