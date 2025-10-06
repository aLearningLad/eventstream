const express = require("express");

const router = express.Router();

router.post("/api/v1/sign-in", (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ message: "No payload was sent from client" });
    }
    res.status(200).json({ message: "This endpoint actually works!" });
  } catch (error) {
    return res.status(500).json({ message: "Unable to sign in: ", error });
  }
});

module.exports = { signInRoute: router };
