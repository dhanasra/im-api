const admin = require('firebase-admin');
const Party = require('../types/party');

module.exports = {
  Query: {
    async getParties(parent,args) {
      try {
        const partys = await admin
          .firestore()
          .collection('BusinessDB')
          .doc(args.phoneNumber)
          .collection('parties')
          .get();
        return partys.docs.map(party => party.data());
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    async getParty(parent, args) {
      try {
        const partyDoc = await admin
          .firestore()
          .collection('BusinessDB')
          .doc(args.phoneNumber)
          .collection('parties')
          .doc(args.partyId)
          .get();
        const party = partyDoc.data() ;
        return party || new ValidationError('User ID not found');
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    async deleteParty(parent, args) {
      try {
        const partyDoc = await admin
          .firestore()
          .collection('BusinessDB')
          .doc(args.phoneNumber)
          .collection('parties')
          .doc(args.partyId)
          .delete();
        return "success";
      } catch (error) {
        throw new ApolloError(error);
      }
    },
  },
  Mutation: {
    addParty: async(parent,args) =>{
      try {
       await admin
          .firestore()
          .collection('BusinessDB')
          .doc(args.phoneNumber)
          .collection('parties')
          .doc(args.party.id)
          .set(args.party);
        return "success";
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    updateParty: async(parent,args) => {
      try {
        await admin
          .firestore()
          .collection('BusinessDB')
          .doc(args.phoneNumber)
          .collection('parties')
          .doc(args.party.id)
          .update(args.party);
        return "success";
      } catch (error) {
        throw error;
      }
    },
  }
}