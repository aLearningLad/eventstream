const mongoose = require("mongoose");

const connectToDb = async () => {
  if (!process.env.MONGODB_URL) {
    throw new Error("MongoDB connection string is missing!");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL);

    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB is connected!");
    }
  } catch (error) {
    console.error("Unable to connect to MongoDB: ", error);
  }
};

module.exports = connectToDb;
