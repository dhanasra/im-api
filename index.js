const { merge } = require('lodash');
const { ApolloServer, ApolloError, ValidationError, gql } = require('apollo-server');
const { makeExecutableSchema, mergeSchemas, addMockFunctionsToSchema } = require('@graphql-tools/schema');
const user  = require('./modules/types/user');
const party  = require('./modules/types/party');
const item  = require('./modules/types/item');
const transaction  = require('./modules/types/transaction');
const business  = require('./modules/types/business');
const userResolvers  = require('./modules/resolvers/userResolver');
const partyResolvers  = require('./modules/resolvers/partyResolver');
const itemResolvers  = require('./modules/resolvers/itemResolver');
const businessResolvers  = require('./modules/resolvers/businessResolver');
const transactionResolvers  = require('./modules/resolvers/transactionResolver');
const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');
const { getAuth } = require('firebase/auth');
const { firebase, config, initializeApp } = require('firebase/app');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

initializeApp({
  apiKey: 'AIzaSyAxRIe3SHgLC10oEH9wwdfyNaEntI0JcWA'
});

const Query = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

const resolvers = {};

const userSchema = makeExecutableSchema({
  typeDefs: [Query,user,party,item,business,transaction],
  resolvers: merge(resolvers,userResolvers,partyResolvers,itemResolvers,businessResolvers,transactionResolvers),
});

const schema = mergeSchemas({
  schemas: [userSchema]
});

const server = new ApolloServer({
  schema: schema,
  introspection: true
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
