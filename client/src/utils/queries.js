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

export const QUERY_USER = gql`
    query getUser($userId: ID!) {
        user(userId: $userId) {
            _id
            username
            email
            password
            timelines {
              _id
              title
              description
            }
        }
    }
`;