const { Kafka } = require("kafkajs");

const kafa = new Kafka({
  clientId: "eventstream",
  brokers: ["host.docker.internal:29092"],
});

module.exports = kafa;
