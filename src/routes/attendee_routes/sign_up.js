const router = require("express").Router();

router.post("/api/v1/attendee/sign-up", (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const role = "attendee";
  const { full_name, email, password } = req.body;

  // hash password

  return res.status(200).json({ message: "This route woooorks" });
});

module.exports = { attendeeSignUpRoute: router };
