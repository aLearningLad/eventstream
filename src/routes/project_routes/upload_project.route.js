const router = require("express").Router();

router.post("/api/v1/new-project", async (req, res) => {
  // ----- collect all info
  const {} = req.body;

  // ----- collect all info

  // ------------ call producers ---------------

  // 1. postgresql event producer

  // 2. mongodb metadata producer

  // 3. aws s3 media files producer

  // ------------ call producers ----------------

  res.status(200).json({ message: "Yessir, this endpoint works!" });
});

module.exports = { uploadProjectRoute: router };
