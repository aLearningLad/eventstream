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
};

module.exports = projectEventToKafka;
