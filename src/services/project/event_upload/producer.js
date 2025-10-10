const kafka = require("../../../config/kafka/kafka");

const projectEventToKafka = async ({
  s3_key,
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
    !s3_key ||
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
          tags,
          s3_key,
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

  await producer.disconnect();
  return 200;
};

module.exports = projectEventToKafka;
