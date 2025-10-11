const bcrypt = require("bcrypt");
const saltRounds = 10;
const db_client = require("../../config/postgresql/client");
const db = db_client;

const handleSignUp = (req, res) => {
  if (!req.body) {
    return res.status(401).json({ message: "Missing fields" });
  }

  const role = "attendee";
  const { full_name, email, password } = req.body;

  // ommissions
  if (!full_name || !email || !password) {
    return res.status(401).json({ message: "User credentials are incomplete" });
  }

  // hash password
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      // insert user into postgresql
      const { error: new_user_error } = await db.from("users").insert({
        full_name,
        password: hash,
        email,
        role,
      });

      if (new_user_error) {
        return res.status(500).json({ error: "Unable to sign user up" });
      }
    });
  });

  return res.status(200).json({ success: "User successfully signed up" });
};

module.exports = handleSignUp;
