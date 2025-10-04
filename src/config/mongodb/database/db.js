const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    const res = await mongoose.createConnection(process.env.MONGODB_URL);

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
