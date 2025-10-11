const db_client = require("../../config/postgresql/client");
const db = db_client;

const waitListController = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "No request payload sent" });
  }

  const { event_id, user_id } = req.body;

  if (!event_id || !user_id) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const { error: waiting_list_error } = await db.from("waitlist").insert({
    event_id,
    user_id,
  });

  if (waiting_list_error) {
    console.error("Unable to subscribe to waiting list: ", waiting_list_error);
    return res
      .status(500)
      .json({ message: "Unable to subscribe to waiting list" });
  }
  return res.status(201).json({ success: "Subscribed to waiting list" });
};

module.exports = waitListController;
