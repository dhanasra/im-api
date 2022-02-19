const admin = require('firebase-admin');

module.exports = {
  Query: {
    async getItems(parent,args) {
      try {
        const items = await admin
          .firestore()
          .collection('BusinessDB')
          .doc(args.phoneNumber)
          .collection('items')
          .get();
        return items.docs.map(item => item.data());
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    async getItem(parent, args) {
      try {
        const itemDoc = await admin
          .firestore()
          .collection('BusinessDB')
          .doc(args.phoneNumber)
          .collection('items')
          .doc(args.itemId)
          .get();
        const item = itemDoc.data() ;
        return item || new ValidationError('User ID not found');
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    async deleteItem(parent, args) {
      try {
        const itemDoc = await admin
          .firestore()
          .collection('BusinessDB')
          .doc(args.phoneNumber)
          .collection('items')
          .doc(args.itemId)
          .delete();
        return "success";
      } catch (error) {
        throw new ApolloError(error);
      }
    },
  },

  Mutation: {
    addItem: async(parent,args) =>{
      try {
       await admin
          .firestore()
          .collection('BusinessDB')
          .doc(args.phoneNumber)
          .collection('items')
          .doc(args.item.id)
          .set(args.item);
        return "success";
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    updateItem: async(parent,args) => {
      try {
        await admin
          .firestore()
          .collection('BusinessDB')
          .doc(args.phoneNumber)
          .collection('items')
          .doc(args.item.id)
          .update(args.item);
        return "success";
      } catch (error) {
        throw error;
      }
    },
  }
}