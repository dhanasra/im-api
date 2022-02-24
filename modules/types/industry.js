const { gql } = require('apollo-server');

const Industry = gql`
  extend type Query {
    getIndustrys: [Industry]
  }

  type Industry {
    name: String
  }
`;

module.exports = Industry;