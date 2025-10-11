process.on("uncaughtException", console.error);
process.on("unhandledRejection", console.error);

const express = require("express");
const dotenv = require("dotenv").config(); // load up envs and make them usable
const connectToDb = require("./config/mongodb/database/db");
const {
  uploadMetadataRoute,
} = require("./routes/metadata_routes/upload.routes");
const { uploadEventRoute } = require("./routes/event_routes/upload.routes");
require("./consumers/metadata/upload"); // this starts up metadata upload consumer
require("./consumers/event/upload"); //this starts up event upload consumer
require("./consumers/project/project_event/upload_event");
const { signUpRoute } = require("./routes/auth_routes/sign_up.route");
const { signInRoute } = require("./routes/auth_routes/sign_in.route");
const session = require("express-session");
const passport = require("passport");
const { signOutRoute } = require("./routes/auth_routes/sign_out.route");
const db_client = require("./config/postgresql/client");
const SQLiteStore = require("better-sqlite3-session-store")(session);
const { uploadNewMediaRoute } = require("./routes/media_routes/upload.route");
const {
  uploadProjectRoute,
} = require("./routes/project_routes/upload_project.route");
const { attendeeSignUpRoute } = require("./routes/attendee_routes/sign_up");
const {
  joinWaitingListRoute,
} = require("./routes/attendee_routes/join_waitlist");
const db = db_client;

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

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  // get get a user from DB by ID
  const { data } = await db.from("users").select("*").eq("user_id", id);
  if (data.length === 0) return done(null, false);
  done(null, data[0]);
});

// est. connection to mongoDb
connectToDb().catch((err) =>
  console.error("Unable to connect to mongoDB: ", err)
);

// ____________________________________ROUTES___________________________

// sign in
app.use(signInRoute);

// sign up
app.use(signUpRoute);

// sign out
app.use(signOutRoute);

//upload entire project --> metadata, event info, visuals
app.use(uploadProjectRoute);

// upload event info only
app.use(uploadEventRoute);

// upload metadata only
app.use(uploadMetadataRoute);

// upload media only
app.use(uploadNewMediaRoute);

// attendee sign up
app.use(attendeeSignUpRoute);

// attendee join waiting list
app.use(joinWaitingListRoute);

// organizer retrieve all event info
app.use(retrieveProjectRoute);
