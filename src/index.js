const express = require("express");
const dotenv = require("dotenv").config(); // load up envs and make them usable

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

// general test
app.get("/api/v1/metadata", (req, res) => {
  res.status(200).json({ message: "Ola, cabron!" });
});

// recieve metadata info
app.post("/api/v1/metadata", (req, res) => {
  try {
    // destructure, pull out all values to be saved
    const { event_id, s3_key, type, tags, uploaded_by, description } = req.body; // --> will throw error if any value is missing from req.body

    // alert client if all metadata fields are present
    if (event_id && s3_key && type && tags && uploaded_by && description) {
      res.status(200).json({
        message: "All fields are complete! Commencing metdata upload!",
      });
    }

    // if no client omissions, send data to mongodb (later this becomes: from this route's controller, send as kafka producer TO kafka consumer)
  } catch (error) {
    res.status(400).json({ message: `An error occured: ${error} ` });
    console.error(
      "An error occured while trying to send metadata to MongoDB: ",
      error
    );
  }
});
