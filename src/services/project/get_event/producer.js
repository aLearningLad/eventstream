const kafka = require("../../../config/kafka/kafka");

const fetchProjectProducer = async ({ event_id, organizer_id }) => {
  if (!event_id || !organizer_id) {
    return 400;
  }

  const producer = kafka.producer();

  await producer.connect();

  await producer.send({
    topic: "fetch-project",
    messages: [
      {
        value: JSON.stringify({
          event_id,
          organizer_id,
        }),
      },
    ],
  });

  return 200;
};

module.exports = fetchProjectProducer;
