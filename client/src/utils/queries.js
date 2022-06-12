import { gql } from '@apollo/client';

export const QUERY_TIMELINE = gql`
    query getTimeline($timelineId: ID!) {
        timeline(timelineId: $timelineId) {
          _id
          title
          description
          author
          moments {
            _id
            title
            description
            imageLink
            year
            month
            day
          }
        }
      }
`;

export const QUERY_TIMELINES = gql`
      query getTimelines($author: String!) {
        userTimelines(author: $author) {
          _id
          title
          description
          author
        }
      }
`;

export const QUERY_USER = gql`
    query getUser($userId: ID!) {
        user(userId: $userId) {
            _id
            username
            email
            password
        }
    }
`;