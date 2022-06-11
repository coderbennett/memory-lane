const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        timelines: [Timeline]!
    }

    type Timeline {
        _id: ID
        title: String
        description: String
        author: String
        moments: [Moment]!
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

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        user(userId: ID!): User
        timeline(timelineId: ID!): Timeline
        users: [User]
        timelines: [Timeline]
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        addTimeline(title: String!, description: String!, author: String!): Timeline
        deleteTimeline(timelineId: ID!): Timeline
        addMoment(timelineId: ID!, title: String!, description: String!, imageLink: String!, year: Int!, month: Int, day: Int): Timeline
        deleteMoment(timelineId: ID!, momentId: ID!): Timeline
        login(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;