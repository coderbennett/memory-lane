const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        timelines: [Timeline]
    }

    type Timeline {
        _id: ID
        title: String
        description: String
        author: String
        moments: [Moment]
    }

    type Moment {
        _id: ID
        title: String
        description: String
        imageLink: String
        year: Int
        month: Int
        day: Int
    }

    type Query {
        user(userId: ID!): User
        timeline(timelineId: ID!): Timeline
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): User
        addTimeline(timelineId: ID!, title: String!, description: String!, author: String!): Timeline
        deleteTimeline(timelineId: ID!): Timeline
        addMoment(timelineId: ID!, title: String!, description: String!, imageLink: String!, year: Int!, month: Int, day: Int): Timeline
        deleteMoment(timelineId: ID!, momentId: ID!): Timeline
    }
`;

module.exports = typeDefs;