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
`;

module.exports = typeDefs;