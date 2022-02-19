const { gql } = require('apollo-server');

const Item = gql`
  type Item {
    id: String,
    name: String,
    type: String,
    image: String,
    category: String,
    remark: String,
    pricing: Pricing,
    stock: Stock
  }

  type Pricing {
    salesPrice: String,
    purchasePrice: String,
    wholeSalePrice: String,
    wholeSaleQuantity: String,
    mrp: String,
    unit: String,
    hsn: String,
    gst: String,
    isPriceWithTax: Boolean
  }

  type Stock {
    stockValue: String,
    asOfDate: String,
    lowStockQuantity: String,
    itemCode: String,
    isLowStockWarning: Boolean
  }

  input PricingInput {
    salesPrice: String,
    purchasePrice: String,
    wholeSalePrice: String,
    wholeSaleQuantity: String,
    mrp: String,
    unit: String,
    hsn: String,
    gst: String,
    isPriceWithTax: Boolean
  }

  input StockInput {
    stockValue: String,
    asOfDate: String,
    lowStockQuantity: String,
    itemCode: String,
    isLowStockWarning: Boolean
  }

  input ItemInput {
    id: String,
    name: String,
    type: String,
    image: String,
    category: String,
    remark: String,
    pricing: PricingInput,
    Stock: StockInput
  }

  extend type Query {
    getItems(phoneNumber: String!): [Item],  
    getItem(phoneNumber: String!, itemId: String!): Item
    deleteItem(phoneNumber: String!, itemId: String!): String
  }

  extend type Mutation {
    addItem(phoneNumber:String!, item: ItemInput!):String,
    updateItem(phoneNumber:String!, item: ItemInput!):String
  }
`;

module.exports = Item;