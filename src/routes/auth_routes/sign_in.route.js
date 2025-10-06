const express = require("express");
const passport = require("passport");
const localStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const db_client = require("../../config/postgresql/client");
const ensureAuth = require("../../middleware/is_authenticated");
const router = express.Router();
const db = db_client;

router.post("/api/v1/sign-in", ensureAuth, async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ message: "No payload was sent from client" });
    }

    //   missing credentials password
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .json({ message: "User credentials are incomplete" });
    }

    //   get details from users table
    const { data: data_from_db, error: error_data_from_db } = await db
      .from("users")
      .select("*")
      .eq("email", email);

    //  postgreSQL error
    if (error_data_from_db) throw new Error(error_data_from_db.details);

    //   user isn't in table
    if (data_from_db.length === 0) {
      return res.status(200).json({ message: "No such user found" });
    }

    const user = {
      id: data_from_db[0].user_id,
      email: data_from_db[0].email,
      role: data_from_db[0].role,
      full_name: data_from_db[0].full_name,
    };

    //   compare passwords via bcrypt
    const hashed_password = data_from_db[0].password;
    bcrypt.compare(password, hashed_password, function (err, result) {
      if (result == true) {
        // log user in
        req.login(user, (err) => {
          if (err) return res.status(500).json({ message: "Login failed" });
          res.status(200).json({ message: "Login successful", user });
        });

        // res.status(200).json({ message: "Login successful" });
      } else {
        res.status(401).json({ message: "User credentials are incorrect" });
      }
    });

    // return res.status(200).json({ message: "User details found" });

    //   passport stuff here
  } catch (error) {
    console.log("Unable to sign in: ", error);
    return res.status(500).json({ message: "Unable to sign in: " });
  }
});

module.exports = { signInRoute: router };
