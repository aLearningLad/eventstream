const express = require("express");
const dotenv = require("dotenv").config(); // load up envs and make them usable

// app instance
const app = express();

// port
const PORT = process.env.DEV_PORT;

// start app
app.listen(PORT, () => {
  console.log(`Server instance is listening on PORT: ${PORT}`);
});

// recieve metadata info
app.post("/api/v1/metadata", (req, res) => {
  const { event_id, s3_key, type, tags, uploaded_by, description } = req.body;

  // handle any omissions by client
  if (!event_id || !s3_key || !type || !tags || !uploaded_by || !description) {
    console.log("Request body is incomplete. Please try again");
    res.status(400).json({
      message:
        "Request body is incomplete. Please try again and ensure all fields are complete",
    });
  }

  // if no client omissions, send data to mongodb (later this becomes: from this route's controller, send as kafka producer TO kafka consumer)
  try {
  } catch (error) {}
});
