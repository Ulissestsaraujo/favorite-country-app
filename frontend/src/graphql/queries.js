import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query getCountries {
    countries {
      id
      name
      capital
      population
      flag
    }
  }
`;

export const GET_COUNTRY = gql`
  query getCountryById($id: String!) {
    country(id: $id) {
      id
      name
      capital
      population
      flag
    }
  }
`;

export const GET_FAVORITE_COUNTRIES = gql`
  query FavoriteCountries($userId: ID!) {
    favoriteCountries(user_id: $userId) {
      notes
      id
      country_id
    }
  }
`;

export const GET_FAVORITE_COUNTRIES_BY_ID = gql`
  query FavoriteCountryById($userId: ID!) {
    favoriteCountries(user_id: $userId) {
      id
      country_id
    }
  }
`;
