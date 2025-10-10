const kafka = require("../../../config/kafka/kafka");

const projectEventToKafka = async ({
  tags,
  type,
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
    !type ||
    !tags ||
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

  const reply_to = "project-event-upload";
  const correleation_id = ""; //come back to this

  const producer = kafka.producer();

  await producer.connect();

  await producer.send({
    topic: "project-event-upload",
    messages: [
      {
        value: JSON.stringify({
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

  // await producer.disconnect(); ---> this is expensive. Don't disconnect. Rather let it disconnect automatically on app shut down
  return 200;
};

module.exports = projectEventToKafka;
