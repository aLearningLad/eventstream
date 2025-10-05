const kafa = require("../../config/kafka/kafka");

const consumer = kafa.consumer({
  groupId: "metadata-group",
});

await consumer.connect();

await consumer.subscribe({
  topic: "upload-metadata",
  fromBeginning: true,
});

await consumer.run({
  eachMessage: async () => {},
});
