const mongoose = require("mongoose");

let cachedDb = null;

const connectToDatabase = async () => {
  if (cachedDb) {
    console.log("cacheDB present.")
    return;
  }
  console.log("Creating new mongodb connection")
  await mongoose.connect(process.env.GRAPHQL_DB || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  cachedDb = mongoose.connection;
  return cachedDb;
};

module.exports = { connectToDatabase };
