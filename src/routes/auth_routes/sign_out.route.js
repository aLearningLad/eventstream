const express = require("express");

const router = express.Router();

router.post("/api/v1/sign-out", (req, res) => {
  req.logOut((err) => {
    if (err) return res.status(500).json({ maessage: "Sign out failed" });
    req.session.destroy(() => res.json({ message: "Logged out" }));
  });
});

module.exports = { signOutRoute: router };
