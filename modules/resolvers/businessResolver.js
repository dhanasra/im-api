const admin = require('firebase-admin');

module.exports = {
  Query: {
    async getAllBusiness(parent,args) {
      try {
        const business = await admin
          .firestore()
          .collection('BusinessDB')
          .doc(args.phoneNumber)
          .collection('business')
          .get();
        return business.docs.map(business => business.data());
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    async getBusiness(parent, args) {
      try {
        const businessDoc = await admin
          .firestore()
          .collection('BusinessDB')
          .doc(args.phoneNumber)
          .collection('business')
          .doc(args.businessId)
          .get();
        const business = businessDoc.data() ;
        return business || new ValidationError('User ID not found');
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    async deleteBusiness(parent, args) {
      try {
        const business = await admin
          .firestore()
          .collection('BusinessDB')
          .doc(args.phoneNumber)
          .collection('business')
          .doc(args.businessId)
          .delete();
        return "success";
      } catch (error) {
        throw new ApolloError(error);
      }
    },
  },

  Mutation: {
    addBusiness: async(parent,args) =>{
      try {
       await admin
          .firestore()
          .collection('BusinessDB')
          .doc(args.phoneNumber)
          .collection('business')
          .doc(args.business.businessId)
          .set(args.business);
        return "success";
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    updateBusiness: async(parent,args) => {
      try {
        const businessDoc = await admin
          .firestore()
          .collection('BusinessDB')
          .doc(args.phoneNumber)
          .collection('business')
          .doc(args.business.businessId)
          .update(args.business);
        return "sucess";
      } catch (error) {
        throw error;
      }
    },
  }
}