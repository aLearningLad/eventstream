const express = require("express");
const handleSignOut = require("../../controllers/auth_controllers/sign_out.route");

const router = express.Router();

router.post("/api/v1/sign-out", handleSignOut);

module.exports = { signOutRoute: router };
