const express = require("express");
const dotenv = require("dotenv").config(); // load up envs and make them usable
const connectToDb = require("./config/mongodb/database/db");
const {
  uploadMetadataRoute,
} = require("./routes/metadata_routes/upload.routes");
require("./consumers/metadata/upload");

// app instance
const app = express();

// parse json from client
app.use(express.json());

// port
const PORT = process.env.DEV_PORT;

// start app
app.listen(PORT, () => {
  console.log(`Server instance is listening on PORT: ${PORT}`);
});

connectToDb().catch((err) =>
  console.error("Unable to connect to mongoDB: ", err)
);

// general test
app.get("/api/v1/metadata", (req, res) => {
  res.status(200).json({ message: "Ola, cabron!" });
});

// recieve metadata info
app.use(uploadMetadataRoute);
