const { ApolloServer } = require("apollo-server-lambda");
const { resolvers } = require("./resolvers");
const { typeDefs } = require("./typeDefs");
const { connectToDatabase } = require("../database/connection");
const Course = require("../models/Course");

const createLambdaServer = async (context) => {
  return new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true,
    context: async () => {
      await connectToDatabase();

      return {
        models: {
          Course,
        },
      };
    },
  });
};

module.exports = { createLambdaServer };
