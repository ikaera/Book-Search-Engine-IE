const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    _id: ID!
    name: String!
  }

  type User {
    _id: ID!
    book1: String!
    book2: String!
    book1_votes: Int
    book2_votes: Int
  }

  type Query {
    book: [Book]
    users(_id: String): [User]
  }

  type Mutation {
    createUser(book1: String!, book2: String!): User
    createVote(_id: String!, bookNum: Int!): User
  }
`;

module.exports = typeDefs;
