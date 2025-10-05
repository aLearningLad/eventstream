const kafka = require("../../config/kafka/kafka");

const metadataToKafka = async (newMetadata) => {
  if (!newMetadata) {
    return 400;
  }

  // no issues, proceed to send to kafka maaate! Yup, yup yuuuup!
  const producer = kafka.producer();

  await producer.connect();

  await producer.send({
    topic: "upload-metadata",
    messages: [
      {
        value: JSON.stringify(newMetadata),
      },
    ],
  });

  await producer.disconnect();
  return 200;
};

module.exports = metadataToKafka;
