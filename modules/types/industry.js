const { gql } = require('apollo-server');

const Industry = gql`
  extend type Query {
    getIndustries: Type
  }

  type Types{
    types: [String]
  }
`;

module.exports = Industry;