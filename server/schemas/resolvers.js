const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      return User.find({ _id: context.user._id });
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      return user;
    },
    async saveBook(parent, args, context) {
      console.log(context.user);
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: args } },
          { new: true, runValidators: true },
        );
        return updatedUser;
      } catch (err) {
        console.log(err);
        throw new AuthenticationError('Something went wrong');
      }
    },
  },
};

module.exports = resolvers;
