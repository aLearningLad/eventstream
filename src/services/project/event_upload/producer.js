const kafka = require("../../../config/kafka/kafka");

const projectEventToKafka = async ({
  organizer_id,
  title,
  description,
  location,
  start_time,
  end_time,
  price,
  capacity,
  date,
}) => {
  // handle ommissions
  if (
    !organizer_id ||
    !title ||
    !description ||
    !location ||
    !start_time ||
    !end_time ||
    !price ||
    !capacity ||
    !date
  ) {
    return 400;
  }

  // no issues
  const producer = kafka.producer();

  await producer.connect();

  await producer.send({
    topic: "upload-project-event",
    messages: [
      {
        value: JSON.stringify({
          organizer_id,
          title,
          description,
          location,
          start_time,
          end_time,
          price,
          capacity,
          date,
        }),
      },
    ],
  });

  await producer.disconnect();
};
