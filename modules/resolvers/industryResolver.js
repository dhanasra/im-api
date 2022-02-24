const admin = require('firebase-admin');

module.exports = {
  Query: {
    async getIndustrys() {
      try {
        const Industrys = await admin
          .firestore()
          .collection('industrys')
          .get();
        return Industrys.docs.map(Industry => Industry.data());
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  }
}