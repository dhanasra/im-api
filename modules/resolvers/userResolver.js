const admin = require('firebase-admin');

module.exports = {
  Query: {
    async getUsers() {
      try {
        const users = await admin
          .firestore()
          .collection('users')
          .get();
        return users.docs.map(user => user.data());
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    async getUser(parent, args) {
      try {
        const userDoc = await admin
          .firestore()
          .doc(`users/${args.phoneNumber}`)
          .get();
        const user = userDoc.data() ;
        return user || new ValidationError('User ID not found');
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    async deleteUser(parent, args) {
      try {
        const itemDoc = await admin
          .firestore()
          .collection('users')
          .doc(args.phoneNumber)
          .delete();
        return "success";
      } catch (error) {
        throw new ApolloError(error);
      }
    },
  },
  Mutation: {
    addUser: async(parent,args) => {
      try {
        const userDoc = await admin
          .firestore()
          .collection('users')
          .doc(args.user.phoneNumber)
          .set(args.user);
        return "sucess";
      } catch (error) {
        throw error;
      }
    },
    updateUser: async(parent,args) => {
      try {
        const userDoc = await admin
          .firestore()
          .collection('users')
          .doc(args.phoneNumber)
          .update(args.user);
        return "sucess";
      } catch (error) {
        throw error;
      }
    },
  }
}