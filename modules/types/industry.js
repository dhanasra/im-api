const { gql } = require('apollo-server');

const Industry = gql`
  extend type Query {
    getIndustries: [Industry]
  }

  type Industry {
    name: String
  }
`;

module.exports = Industry;