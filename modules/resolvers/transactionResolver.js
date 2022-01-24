const admin = require('firebase-admin');

module.exports = {
  Query: {
    async getTransactions() {
      try {
        const transactions = await admin
          .firestore()
          .collection('TransactionDB')
          .doc(args.phoneNumber)
          .collection(args.transaction.type)
          .get();
        return transactions.docs.map(transactions => transactions.data());
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    async getTransaction(parent, args) {
      try {
        const transactionsDoc = await admin
          .firestore()
          .collection('TransactionDB')
          .doc(args.phoneNumber)
          .collection(args.transaction.type)
          .doc(args.transaction.id)
          .get();
        const transactions = transactionsDoc.data() ;
        return transactions || new ValidationError('User ID not found');
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    async deleteTransaction(parent, args) {
      try {
        await admin
          .firestore()
          .collection('TransactionDB')
          .doc(args.phoneNumber)
          .collection(args.transaction.type)
          .doc(args.transaction.id)
          .delete();
        return "success";
      } catch (error) {
        throw new ApolloError(error);
      }
    },
  },

  Mutation: {
    addTransaction: async(parent,args) =>{
      try {
       await admin
          .firestore()
          .collection('TransactionDB')
          .doc(args.phoneNumber)
          .collection(args.transaction.type)
          .doc(args.transaction.id)
          .set(args.business);
        return "success";
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    updateTransaction: async(parent,args) => {
      try {
        await admin
          .firestore()
          .collection('TransactionDB')
          .doc(args.phoneNumber)
          .collection(args.transaction.type)
          .doc(args.transaction.id)
          .update(args.transaction);
        return "sucess";
      } catch (error) {
        throw error;
      }
    },
  }
}