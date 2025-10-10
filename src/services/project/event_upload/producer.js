const kafka = require("../../../config/kafka/kafka");

const projectEventToKafka = async ({ s3_key, organizer_id }) => {
  console.log("Producer hit!");
  return 200;
};

module.exports = projectEventToKafka;
