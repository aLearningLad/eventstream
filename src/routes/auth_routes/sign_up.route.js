const passport = require("passport");
const localStrategy = require("passport-local");
const express = require("express");

const router = express.Router();

router.post("/api/v1/sign-up", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(401).json({ message: "User credentials are missing" });
  }

  passport.use(new localStrategy(function verify(username, password, cb) {}));
});

module.exports = { signUpRoute: router };
