const eventToKafka = async (req, res) => {
  // recieve body & destructure
  const {
    organizer_id,
    title,
    description,
    location,
    start_time,
    end_time,
    price,
    capacity,
  } = req.body;

  // fields missing
  if (
    !organizer_id ||
    !title ||
    !description ||
    !location ||
    !start_time ||
    !end_time ||
    !price ||
    !capacity
  ) {
    console.error("Event fields are incomplete");
    return res.status(400).json({ message: "Fields are incomplete" });
  }

  res.status(200).json({ message: `Description is ${description}` });
  // call producer function and pass args
};

module.exports = eventToKafka;
