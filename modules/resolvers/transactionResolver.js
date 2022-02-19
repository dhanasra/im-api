const admin = require('firebase-admin');

module.exports = {
  Query: {
    async getTransactions(parent,args) {
      try {
        const transactions = await admin
          .firestore()
          .collection('BusinessDB')
          .doc(args.phoneNumber)
          .collection('transactions')
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
          .collection('BusinessDB')
          .doc(args.phoneNumber)
          .collection('transactions')
          .doc(args.transactionId)
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
          .collection('BusinessDB')
          .doc(args.phoneNumber)
          .collection('transactions')
          .doc(args.transactionId)
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
          .collection('BusinessDB')
          .doc(args.phoneNumber)
          .collection('transactions')
          .doc(args.transaction.id)
          .set(args.transaction);
        return "success";
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    updateTransaction: async(parent,args) => {
      try {
        await admin
          .firestore()
          .collection('BusinessDB')
          .doc(args.phoneNumber)
          .collection('transactions')
          .doc(args.transaction.id)
          .update(args.transaction);
        return "sucess";
      } catch (error) {
        throw error;
      }
    },
  }
}