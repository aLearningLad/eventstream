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

connectToDb();
