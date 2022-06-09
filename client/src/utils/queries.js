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
`