const express = require("express");
const dotenv = require("dotenv").config(); // load up envs and make them usable
const connectToDb = require("./config/mongodb/database/db");
const {
  uploadMetadataRoute,
} = require("./routes/metadata_routes/upload.routes");
const { uploadEventRoute } = require("./routes/event_routes/upload.routes");
// require("./consumers/metadata/upload"); // this starts up consumer
const { signUpRoute } = require("./routes/auth_routes/sign_up.route");

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

// est. connection to mongoDb
connectToDb().catch((err) =>
  console.error("Unable to connect to mongoDB: ", err)
);

// ____________________________________ROUTES___________________________

// sign up
app.use(signUpRoute);

// upload event info only
app.use(uploadEventRoute);

// upload metadata only
app.use(uploadMetadataRoute);
