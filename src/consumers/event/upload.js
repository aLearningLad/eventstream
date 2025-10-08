const kafka = require("../../config/kafka/kafka");

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
    eachMessage: async ({ topic, partition, messae }) => {
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
        return res.status(200).json({ message: "event details uploaded!" });
      } catch (error) {
        console.error("Unable to upload event data: ", error);
        return res
          .status(500)
          .json({ message: "Kafka unable to upload event to postgreSQL" });
      }
    },
  });
};
