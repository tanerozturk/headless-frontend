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
    toursCount
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

export const GET_PRIMARY_MENU = gql`
  query GET_PRIMARY_MENU($id: ID!) {
    menu(id: $id, idType: SLUG) {
      id
      name
      slug
      menuItems {
        edges {
          node {
            id
            label
            url
            path
          }
        }
      }
    }
  }
`;