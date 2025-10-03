const mongoose = require("mongoose");

// event metadata schema
const eventSchema = new mongoose.Schema({
  event_id: String,
  s3_key: String,
  type: String, // 'poster, billboard, thumbnail, banner, digital'
  tags: [String],
  uploaded_by: String, // user_id
  created_at: Date,
  updated_at: Date,
  description: String, // misc info, notes for event, planning ideas
});

// event model made from schema
const AnEvent = mongoose.model("AnEvent", eventSchema);

module.exports = AnEvent;
