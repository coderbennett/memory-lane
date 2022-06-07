const { AuthenticationError } = require('apollo-server-express');
const { User, Timeline } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = { 
    Query: {
        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId });
        },
        timeline: async (parent, { timelineId }) => {
            return Timeline.findOne({ _id: timelineId });
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            //implement JWT later
            //const token = signToken(user);

            // add token to return later here
            return user;
        }
    }
}