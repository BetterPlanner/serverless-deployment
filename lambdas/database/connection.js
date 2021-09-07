const mongoose = require("mongoose");

let cachedDb = null;

const connectToDatabase = async () => {
  if (cachedDb) return;

  await mongoose.connect(process.env.GRAPHQL_DB || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  cachedDb = mongoose.connection;
  return cachedDb;
};

module.exports = { connectToDatabase };
