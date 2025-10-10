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
  // ommissions
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

  const producer = kafka.producer();

  await producer.connect();

  await producer.send({
    topic: "project-event-upload",
    messages: [
      {
        value: JSON.stringify({
          uploaded_by,
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
        }),
      },
    ],
  });

  return 200;
};

module.exports = projectEventToKafka;
