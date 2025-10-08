const kafka = require("../../config/kafka/kafka");
const db_client = require("../../config/postgresql/client");

const db = db_client;

const startEventConsumer = async () => {
  const consumer = kafka.consumer({
    groupId: "event-group",
  });

  await consumer.connect();

  await consumer.subscribe({
    topic: "upload-event",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
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
      } = JSON.parse(message.value.toString());

      try {
        const { error: event_entry_error } = await db.from("events").insert({
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
        if (event_entry_error) throw new Error(event_entry_error.details);
        console.log("Event data successfully uploaded");
      } catch (error) {
        console.error("Unable to upload event data: ", error);
      }
    },
  });
};

startEventConsumer()
  .then(() => {
    console.log("Event upload consumer is running");
  })
  .catch((err) => {
    console.error("Unable to start event upload consumer: ", err);
  });
