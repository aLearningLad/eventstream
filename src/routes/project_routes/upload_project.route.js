const router = require("express").Router();

router.post("/api/v1/new_project", async (req, res) => {
  res.status(200).json({ message: "Yessir, this endpoint works!" });
});

module.exports = { uploadProjectRoute: router };
