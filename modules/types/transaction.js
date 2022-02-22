const { gql } = require('apollo-server');
const { Party, PartyInput } = require('./party');
const { Item, ItemInput }= require('./item');

const Transaction = gql`
  type Transaction {
      id: String,
      no: String,
      date: String,
      dueDate: String,
      party: Party,
      item: [Item],
      discountPercent: String,
      discountAmount: String,
      roundOff: String,
      isRoundOffMinus: Boolean,
      subTotal: String,
      total: String,
      amountReceived: String,
      notes: String,
      type: String,
      paymentMode: String,
  }

  input TransactionInput {
    id: String,
    no: String,
    date: String,
    dueDate: String,
    party: PartyInput,
    item: [ItemInput],
    discountPercent: String,
    discountAmount: String,
    roundOff: String,
    isRoundOffMinus: Boolean,
    subTotal: String,
    total: String,
    amountReceived: String,
    notes: String,
    type: String,
    paymentMode: String,
  }

  extend type Query {
    getTransactions(phoneNumber: String!,): [Transaction],  
    getTransaction(phoneNumber: String!, transactionId: String!): Transaction
    deleteTransaction(phoneNumber: String!, transactionId: String!): String
  }

  extend type Mutation {
    addTransaction(phoneNumber:String!, transaction: TransactionInput!):String,
    updateTransaction(phoneNumber:String!, transaction: TransactionInput!):String
  }
`;

module.exports = Transaction;