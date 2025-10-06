const express = require("express");
const dotenv = require("dotenv").config(); // load up envs and make them usable
const connectToDb = require("./config/mongodb/database/db");
const {
  uploadMetadataRoute,
} = require("./routes/metadata_routes/upload.routes");
const { uploadEventRoute } = require("./routes/event_routes/upload.routes");
// require("./consumers/metadata/upload"); // this starts up consumer
const { signUpRoute } = require("./routes/auth_routes/sign_up.route");
const { signInRoute } = require("./routes/auth_routes/sign_in.route");
const session = require("express-session");
const passport = require("passport");
const SQLiteStore = require("better-sqlite3-session-store")(session);

// app instance
const app = express();

// parse json from client
app.use(express.json());

// for weird cases where no body is sent in post req.
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "Invalid or empty JSON payload" });
  }
  next();
});

// session support via passport.js
app.use(
  session({
    secret: process.env.POSTGRESQL_DB_URL,
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({
      client: require("better-sqlite3")("./var/db/sessions.db"),
    }),
  })
);

app.use(passport.authenticate("session"));

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

app.use(signInRoute);

// sign up
app.use(signUpRoute);

// upload event info only
app.use(uploadEventRoute);

// upload metadata only
app.use(uploadMetadataRoute);
