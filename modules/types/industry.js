const { gql } = require('apollo-server');

const Industry = gql`
  type Industry {
    name: String
  }

  extend type Query {
    getIndustries: [Industry],   
  }
`;

module.exports = Industry;