const { Kafka } = require("kafkajs");

const kafa = new Kafka({
  clientId: "eventstream",
  brokers: ["localhost:29092"],
});

module.exports = kafa;
