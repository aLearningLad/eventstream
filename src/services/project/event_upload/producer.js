const kafka = require("../../../config/kafka/kafka");

const projectEventToKafka = async ({
  image_data,
  company_name,
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
    !image_data ||
    !company_name ||
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
  const correlation_id = ""; //come back to this

  const producer = kafka.producer();

  await producer.connect();

  await producer.send({
    topic: "upload-project-event",
    messages: [
      {
        value: JSON.stringify({
          image_data,
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
