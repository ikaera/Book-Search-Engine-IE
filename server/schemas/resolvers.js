const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      return User.find({ _id: context.user._id });
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },

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

    // Set up mutation so a logged in user can only remove their book and no one else's
    removeBook: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: args.bookId } } },
          { new: true },
        );
        // if (!updatedUser) {
        //   return res.status(404).json({ message: "Couldn't find user with this id!" });
        // }
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
