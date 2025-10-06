const passport = require("passport");
const localStrategy = require("passport-local");
const express = require("express");
const db_client = require("../../config/postgresql/client");
const bcrypt = require("bcrypt");

const router = express.Router();
const db = db_client;
const saltRounds = 10;

router.post("/api/v1/sign-up", async (req, res) => {
  //  no req.body
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message:
        "Request does not include a payload. No request body is provided",
    });
  }

  const { full_name, email, role, password } = req.body;

  // confirm payload from client
  if (!full_name || !password) {
    return res.status(401).json({ message: "User credentials are missing" });
  }

  // magic sauce to protect password
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      //   insert into postgresql
      const { error: user_reg_error } = await db.from("users").insert({
        full_name,
        password,
        email,
        role,
      });

      if (user_reg_error) {
        return res
          .status(500)
          .json({ message: "Unable to save new user: ", user_reg_error });
      }
    });
  });
});

module.exports = { signUpRoute: router };
