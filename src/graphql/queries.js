import { gql } from '@apollo/client';

export const GET_TOURS = gql`
  query GetTours($first: Int, $after: String) {
    tours(first: $first, after: $after) {
      nodes {
        id
        title
        excerpt
        slug
        featuredImage {
          node {
            sourceUrl
          }
        }
        acftours {
          tourPrice
          tourLocation
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const GET_TOUR_BY_SLUG = gql`
  query GetTourBySlug($slug: String!) {
    tourBy(slug: $slug) {
      title
      content
      acftours {
        tourPrice
        tourInformation
        tourLocation
        tourDate
      }
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
`;