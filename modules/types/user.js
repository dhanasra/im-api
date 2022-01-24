const { gql } = require('apollo-server');

const User = gql`
  extend type Query {
    getUsers: [User],  
    getUser(phoneNumber: String!): User,
    deleteUser(phoneNumber: String!): String
  }

  extend type Mutation {
    addUser(user: UserInput):String,
    updateUser(phoneNumber:String, user: UserInput):String
  }

  input UserInput {
    name: String,
    phoneNumber: String,
    language: String,
    email: String 
  }

  type User {
    name: String,
    phoneNumber: String,
    language: String,
    email: String 
  }
`;

module.exports = User;