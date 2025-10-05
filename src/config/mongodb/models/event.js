const mongoose = require("mongoose");

// event metadata schema
const eventSchema = new mongoose.Schema(
  {
    event_id: String,
    s3_key: String,
    type: String, // 'poster, billboard, thumbnail, banner, digital'
    tags: [String],
    uploaded_by: String, // user_id
    description: String, // misc info, notes for event, planning ideas
  },
  { timestamps: true }
);

// event model made from schema
const EventModel = mongoose.model("EventModel", eventSchema);

module.exports = EventModel;
