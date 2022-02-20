const { gql } = require('apollo-server');

const Party = gql`
  type Party {
    id: String,
    name: String,
    type: String,
    phoneNumber: String,
    gstin: String,
    billingAddress: String,
    shippingAddress: String,
    creditPeriod: String,
    creditLimit: String,
    balance: String,
    isPay: Boolean
  }

  input PartyInput {
    id: String,
    name: String,
    type: String,
    phoneNumber: String,
    gstin: String,
    billingAddress: String,
    shippingAddress: String,
    creditPeriod: String,
    creditLimit: String,
    balance: String,
    isPay: Boolean
  }

  extend type Query {
    getParties(phoneNumber: String!): [Party],  
    getParty(phoneNumber: String!, partyId: String!): Party
    deleteParty(phoneNumber: String!, partyId: String!): String
  }

  extend type Mutation {
    addParty(phoneNumber:String!, party: PartyInput!):String,
    updateParty(phoneNumber:String!, party: PartyInput!):String
  }
`;

module.exports = Party;