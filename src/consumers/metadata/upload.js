const kafka = require("../../config/kafka/kafka");
const EventModel = require("../../config/mongodb/models/event");

const startConsumer = async () => {
  const consumer = kafka.consumer({
    groupId: "metadata-group",
  });

  await consumer.connect();

  await consumer.subscribe({
    topic: "upload-metadata",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const { description, event_id, s3_key, type, tags, uploaded_by } =
        JSON.parse(message.value.toString());

      //   convert to model
      const newMetadata = new EventModel({
        description,
        event_id,
        s3_key,
        type,
        tags,
        uploaded_by,
      });

      await newMetadata
        .save()
        .then(() => {
          console.log("metadata successfully uploaded to MongoDB");
        })
        .catch((err) =>
          console.error("Kafka unable to save metadata to mongoDB: ", err)
        );
    },
  });
};

startConsumer()
  .then(() => {
    console.log("Consumer is running");
  })
  .catch((err) => {
    console.error("Unable to start consumer: ", err);
  });
