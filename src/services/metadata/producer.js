const kafka = require("../../config/kafka/kafka");

const metadataToKafka = async ({
  description,
  event_id,
  s3_key,
  type,
  tags,
  uploaded_by,
}) => {
  if (!description || !event_id || !s3_key || !type || !tags || !uploaded_by) {
    return 400;
  }

  // no issues, proceed to send to kafka maaate! Yup, yup yuuuup!
  const producer = kafka.producer();

  await producer.connect();

  await producer.send({
    topic: "upload-metadata",
    messages: [
      {
        value: JSON.stringify({
          description,
          event_id,
          s3_key,
          type,
          tags,
          uploaded_by,
        }),
        // value: "Hi there!",
      },
    ],
  });

  await producer.disconnect();
  return 200;
};

module.exports = metadataToKafka;
