const { gql } = require('apollo-server');

const Business = gql`
  type Business {
      businessId: String,
      businessName: String,
      businessLogo: String,
      businessPhoneNumber: String,
      businessType: String,
      industryType: String,
      bankDetails: Bank,
      upiId: String,
      billingAddress: String,
      gstin: String,
      placeOfSupply: String,
      termsAndConditions: String,
      Signature: String,
      money: Money
  }

  type Bank {
    accountNumber: String,
    accountHolderName: String,
    ifscCode: String,
    bankBranchName: String
  }

  type Money {
    toPay: String,
    toCollect: String,
    cash: String,
    bank: String,
    stockValue: String
  }

  input BankInput {
    accountNumber: String,
    accountHolderName: String,
    ifscCode: String,
    bankBranchName: String
  }

  input MoneyInput {
    toPay: String,
    toCollect: String,
    cash: String,
    bank: String,
    stockValue: String
  }

  input BusinessInput {
    businessId: String,
    businessName: String,
    businessLogo: String,
    businessPhoneNumber: String,
    businessType: String,
    industryType: String,
    bankDetails: BankInput,
    upiId: String,
    billingAddress: String,
    gstin: String,
    placeOfSupply: String,
    termsAndConditions: String,
    Signature: String,
    money: MoneyInput
  }

  extend type Query {
    getAllBusiness(phoneNumber: String!): [Business],  
    getBusiness(phoneNumber: String!, businessId: String!): Business
    deleteBusiness(phoneNumber: String!, businessId: String!): String
  }

  extend type Mutation {
    addBusiness(phoneNumber:String!, business: BusinessInput!):String,
    updateBusiness(phoneNumber:String!, business: BusinessInput!):String
  }
`;

module.exports = Business;