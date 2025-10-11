const router = require("express").Router();
const handleSignUp = require("../../controllers/attendee_controllers/handle_sign_up");

router.post("/api/v1/attendee/sign-up", handleSignUp);

module.exports = { attendeeSignUpRoute: router };
