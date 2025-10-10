const db_client = require("../../config/postgresql/client");
const mongo_model = require("../../config/mongodb/models/event");
const generateKey = require("../../utils/generate_key");
const s3Client = require("../../config/aws/s3_client");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const projectEventToKafka = require("../../services/project/event_upload/producer");
const cryptoKey = generateKey();

const postProjectController = async (req, res) => {
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
    tags,
    type,
  } = req.body;

  const file = req.file;
  // END ----- collect all info

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
    !type ||
    !file.buffer
  ) {
    return res.status(401).json({ message: "Required fields are missing" });
  }
  // END -----account for missing info

  // ------------ call producers ---------------

  const reply_to = "project-metadata-links"; // topic name for the metadata upload!
  try {
    const s3_key = `${company_name}/${cryptoKey}-${organizer_id}`;

    const response = await projectEventToKafka({
      tags,
      s3_key,
      reply_to,
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

    if (response === 400) {
      res.status(400).json({
        message: "Unable to send event and metadata payload to consumer",
      });
    } else {
      console.log("Yeeeaaah! Producer sent data off to consumer");
      res
        .status(200)
        .json({ message: "Yeeeaaah! Producer sent data off to consumer" });
    }

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

    console.log("Event upload complete!");
    return res.status(200).json({ message: "Yessir, this endpoint works!" });
  } catch (error) {
    console.error("An error occured while uploading project: ", error);
    return res.status(500).json({ message: "Unable to upload event details" });
  }
};

module.exports = postProjectController;
