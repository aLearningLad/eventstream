const express = require("express");
const signUpController = require("../../controllers/auth_controllers/sign_up.route");
const router = express.Router();

router.post("/api/v1/sign-up", signUpController);

module.exports = { signUpRoute: router };
