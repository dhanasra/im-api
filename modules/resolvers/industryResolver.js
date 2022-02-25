const admin = require('firebase-admin');
const Industry = require('../types/industry');

module.exports = {
  Query: {
    async getIndustries() {
      try {
        const industry = await admin
          .firestore()
          .collection('industries')
          .doc('types')
          .get();
        const indus = industry.data() ;
        return indus || new ValidationError('indus ID not found');
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  }
}