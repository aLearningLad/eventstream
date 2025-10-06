const passport = require("passport");
const localStrategy = require("passport-local");
const express = require("express");
const db_client = require("../../config/postgresql/client");
const bcrypt = require("bcrypt");

const router = express.Router();
const db_client = db_client();
const saltRounds = 10;

router.post("/api/v1/sign-up", (req, res) => {
  const { username, password } = req.body;

  // confirm payload from client
  if (!username || !password) {
    return res.status(401).json({ message: "User credentials are missing" });
  }

  // magic sauce to protect password
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      console.log(
        `Password text is ${password}, and when hashed it is: ${hash}`
      );
    });
  });
});

module.exports = { signUpRoute: router };
