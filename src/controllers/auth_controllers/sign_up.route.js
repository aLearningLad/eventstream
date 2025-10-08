const bcrypt = require("bcrypt");
const db_client = require("../../config/postgresql/client");
const db = db_client;
const saltRounds = 10;

const signUpController = async (req, res) => {
  //  no req.body
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message:
        "Request does not include a payload. No request body is provided",
    });
  }

  const {
    full_name,
    email,
    role,
    password,
    company_name = "",
    bio = "",
  } = req.body;

  // confirm payload from client
  if (!full_name || !password) {
    return res.status(401).json({ message: "User credentials are missing" });
  }

  // ensure company name and bio fields
  if (role === "organizer" && company_name.length < 1 && bio.length < 1) {
    return res
      .status(401)
      .json({ message: "Fields for organizer account type are incomplete" });
  }

  // magic sauce to protect password
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      //   insert into postgresql
      const { data: new_user_data, error: user_reg_error } = await db
        .from("users")
        .insert({
          full_name,
          password: hash,
          email,
          role,
        })
        .select();

      if (user_reg_error) {
        return res
          .status(500)
          .json({ message: "Unable to save new user: ", user_reg_error });
      }

      if (role === "organizer") {
        const { error: organizer_reg_error } = await db
          .from("organizers")
          .insert({
            user_id: new_user_data[0].user_id,
            company_name,
            bio,
          });

        if (organizer_reg_error) {
          return res.status(500).json({
            message: "Unable to save organizer data: ",
            organizer_reg_error,
          });
        }
      }

      return res.status(201).json({ message: "New user registered" });
    });
  });
};

module.exports = signUpController;
