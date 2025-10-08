const router = require("express").Router();

router.post("/api/v1/new-project", async (req, res) => {
  // ----- collect all info
  const {
    organizer_id,
    title,
    description,
    location,
    start_time,
    end_time,
    price,
    capacity,
    date,
  } = req.body;

  // ----- collect all info

  // ------------ call producers ---------------

  // 1. postgresql event producer ---> this returns event_id from it's consumer

  // 2. aws s3 media files producer ---> await event_id from 1. This returns s3 key from it's consumer

  // 3. mongodb metadata producer ---> await event_id from 1. AND await s3_key from 2. returns mongo_id

  // ------------ call producers ----------------

  res.status(200).json({ message: "Yessir, this endpoint works!" });
});

module.exports = { uploadProjectRoute: router };
