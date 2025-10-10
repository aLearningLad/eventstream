const kafka = require("../../../config/kafka/kafka");
const db_client = require("../../../config/postgresql/client");
const metadata_model = require("../../../config/mongodb/models/event");
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
        const event_id = event_id_data[0].event_id;

        console.log("The event id is: ", event_id);
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
