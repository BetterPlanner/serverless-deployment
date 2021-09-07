const { gql } = require("apollo-server-lambda");

const typeDefs = gql`
  type Query {
    courses: [Course!]!
    getCourse(search: String): [Course!]
    getTree(search: String): Tree
  }
  type Tree {
    code: String!
    children: [Tree]
    hasChildren: Boolean!
  }
  type Course {
    id: ID!
    code: String!
    name: String!
    description: String!
    division: String!
    department: String
    prerequisites: String
    exclusions: String
    level: Int
    campus: String!
    term: String
    prerequisites_array: [String]
    required_for: [String]
  }
  type Mutation {
    createCourse(code: String!): Course!
  }
`;

module.exports = { typeDefs };
