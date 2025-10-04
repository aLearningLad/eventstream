const express = require("express");
const dotenv = require("dotenv");
const connectToDb = require("./config/mongodb/database/db");

// app instance
const app = express();

// load up envs and make them usable
dotenv.config();

// port
const PORT = process.env.DEV_PORT;

// start app
app.listen(PORT, () => {
  console.log(`Server instance is listening on PORT: ${PORT}`);
});

// recieve metadata info
app.post("/metadata", (req, res) => {
  const { event_id, s3_key, type, tags, uploaded_by, description } = req.body;

  if (!event_id || !s3_key || !type || !tags || !uploaded_by || !description) {
    console.log("Request body is incomplete. Please try again");
    res
      .status(400)
      .json({
        message:
          "Request body is incomplete. Please try again and ensure all fields are complete",
      });
  }
});
