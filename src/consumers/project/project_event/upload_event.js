const kafka = require("../../../config/kafka/kafka");
const db_client = require("../../../config/postgresql/client");
const metadata_model = require("../../../config/mongodb/models/event");
const s3Client = require("../../../config/aws/s3_client");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const generateKey = require("../../../utils/generate_key");
const db = db_client;

const startPorjectEventConsumer = async () => {
  const consumer = kafka.consumer({
    groupId: "project-group",
  });

  await consumer.connect();

  await consumer.subscribe({
    topic: "upload-project-event",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const {
        image_data,
        company_name,
        type,
        tags,
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
      } = JSON.parse(message.value.toString());

      try {
        // 1. sql events upload
        const { data: event_id_data, error: event_entry_error } = await db
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

        if (event_entry_error) throw new Error(event_entry_error);
        const random_key = generateKey();
        const event_id = event_id_data[0].event_id;
        const s3_key = `${company_name}/${event_id}-${organizer_id}-${random_key}`;

        // 2. mongo metadata upload
        const doc = new metadata_model({
          description,
          event_id,
          s3_key,
          tags,
          type,
          uploaded_by: organizer_id,
        });
        const metadata = await doc.save();
        const mongo_id = await metadata._id;

        // 3. aws s3 upload
        const bucket_name = process.env.AWS_S3_BUCKET_NAME;
        await s3Client.send(
          new PutObjectCommand({
            Bucket: bucket_name,
            Key: s3_key,
            Body: image_data,
          })
        );
      } catch (error) {
        console.error("Unable to upload event: ", event_entry_error);
      }
    },
  });
};

startPorjectEventConsumer()
  .then(() => {
    console.log("Project event consumer is running");
  })
  .catch((err) => {
    console.error("Unable to start project event upload consumer");
  });

// ref
//   SQL upload
// const { data: event_id_data, error: event_entry_error } = await db
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
// if (event_entry_error) throw new Error(event_entry_error);
// const event_id = await event_id_data[0].event_id;
// mongo upload
// const doc = new metadata_model({
//   description,
//   event_id,
//   s3_key,
//   tags,
//   type,
//   uploaded_by: organizer_id,
// });
// const mongo_result = await doc.save();
// const mongo_id = mongo_result._id;
//   publish event_id(postgreSQL) and object_id(mongo) to event_metadata_links
//   DO HERE!
