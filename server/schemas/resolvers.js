const { Book, User } = require('../models');

const resolvers = {
  Query: {
    book: async () => {
      return Book.find({});
    },
    users: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return User.find(params);
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      return user;
    },
    createVote: async (parent, { _id, bookNum }) => {
      const vote = await User.findOneAndUpdate(
        { _id },
        { $inc: { [`book${bookNum}_votes`]: 1 } },
        { new: true },
      );
      return vote;
    },
  },
};

module.exports = resolvers;
