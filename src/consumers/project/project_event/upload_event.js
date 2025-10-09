const kafka = require("../../../config/kafka/kafka");
const db_client = require("../../../config/postgresql/client");

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
        //   SQL upload
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

        // mongo upload

        //   publish event_id(postgreSQL) and object_id(mongo) to event_metadata_links
        const event_id = await event_id_data[0].event_id;
      } catch (error) {
        console.log("Unable to upload event: ", event_entry_error);
      }
    },
  });
};
