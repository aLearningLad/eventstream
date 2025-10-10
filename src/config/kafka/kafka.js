const { Kafka, logLevel } = require("kafkajs");

const kafa = new Kafka({
  clientId: "eventstream",
  brokers: ["localhost:29092"],
  logLevel: logLevel.NOTHING,
});

module.exports = kafa;
