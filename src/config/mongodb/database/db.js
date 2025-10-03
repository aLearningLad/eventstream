const mongoose = require("mongoose");

const connectToDb = () => {
  try {
    const res = mongoose.createConnection("/");

    if (res.ok) {
      console.log("MongoDB is connected!");
      return;
    }

    throw new Error("Connection failed, bruv!");
  } catch (error) {
    console.log("Unable to connect to MongoDB: ", error);
  }
};

module.exports = connectToDb();
