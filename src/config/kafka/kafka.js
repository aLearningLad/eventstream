const { Kafka } = require("kafkajs");

const kafa = new Kafka({
  clientId: "eventstream",
  brokers: ["localhost:9092"],
});

module.exports = kafa;
