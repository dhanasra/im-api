const { gql } = require('apollo-server');

const Industry = gql`
  extend type Query {
    getIndustries: [String]
  }
`;

module.exports = Industry;