const sql = require("../../config/postgresql/client");
const db = sql;

const purchaseController = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "No payload sent with request" });
  }

  const { event_id } = req.params;
  const { user_id } = req.body;

  if (!event_id || !user_id) {
    console.error("Event and/or User IDs ommitted");
    return res
      .status(400)
      .json({ message: "IDs are required for ticket purchase" });
  }

  const { data: ticket_data, error: ticket_data_error } = await db
    .from("tickets")
    .insert({
      user_id,
      event_id,
    })
    .select();

  if (ticket_data_error) {
    console.error(ticket_data_error);
    res.status(500).json({ message: "Unable to purchase tickets" });
  }

  const ticket_id = await ticket_data[0].ticket_id;

  res
    .status(200)
    .json({ success: "Ticket purchased!", ticket_number: ticket_id });
};

module.exports = purchaseController;
