const kafka = require("../../config/kafka/kafka");

const metadataToKafka = async (newMetadata) => {
  if (!newMetadata) {
    return res
      .status(400)
      .json({ message: "No payload is available for upload" });
  }

  // no issues, proceed to send to kafka
  const producer = kafka.producer();

  await producer.connect();

  await producer.send({
    topic: "upload-metadata",
    messages: [
      {
        metadata: newMetadata,
      },
    ],
  });

  await producer.disconnect();
};
