const admin = require('firebase-admin');
const Industry = require('../types/industry');

module.exports = {
  Query: {
    async getIndustries() {
      try {
        const industries = await admin
          .firestore()
          .collection('industries')
          .get();
        return industries.docs.map(industry => industry.data());
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  }
}