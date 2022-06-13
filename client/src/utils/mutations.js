import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_TIMELINE = gql`
  mutation addTimeline($title: String!, $description: String!, $author: String!) {
    addTimeline(title: $title, description: $description, author: $author) {
      _id
      title
      description
      author
      moments {
        _id
        description
        imageLink
        year
        month
        day
      }
    }
  }
`;

export const DELETE_TIMELINE = gql`
  mutation deleteTimeline($timelineId: ID!) {
    deleteTimeline(timelineId: $timelineId) {
      _id
      title
    }
  }
`;

export const ADD_MOMENT = gql`
  mutation addMoment($timelineId: ID!, $title: String!, $description: String!, $imageLink: String!, $year: Int!, $month: Int!, $day: Int!) {
    addMoment(timelineId: $timelineId, title: $title, description: $description, imageLink: $imageLink, year: $year, month: $month, day: $day) {
      _id
      moments {
        _id
        description
        imageLink
        year
        month
        day
      }
    }
  }
`;

export const DELETE_MOMENT = gql`
  mutation deleteMoment($timelineId: ID!, $momentId: ID!) {
    deleteMoment(timelineId: $timelineId, momentId: $momentId) {
      _id
    }
  }
`;