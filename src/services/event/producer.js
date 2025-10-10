const kafka = require("../../config/kafka/kafka");

const eventToKafka = async ({
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
}) => {
  if (
    !uploaded_by ||
    !type ||
    !tags ||
    !reply_to ||
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

  // no issues, proceed to send to kafka bruuuuuuv! Light weight, let's gooooo!
  const producer = kafka.producer();

  await producer.connect();

  await producer.send({
    topic: "upload-event",
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
  return 200;
};

module.exports = eventToKafka;
