import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      id
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation register($username: String!, $password: String!) {
    registerUser(username: $username, password: $password) {
      id
    }
  }
`;

export const ADD_FAVORITE_COUNTRY_MUTATION = gql`
  mutation AddFavoriteCountry(
    $userId: ID!
    $countryId: String!
    $notes: String
  ) {
    addFavoriteCountry(
      user_id: $userId
      country_id: $countryId
      notes: $notes
    ) {
      id
      country_id
      notes
      user_id
    }
  }
`;

export const DELETE_FAVORITE_COUNTRY_MUTATION = gql`
  mutation DeleteFavoriteCountry($deleteFavoriteCountryId: ID!) {
    deleteFavoriteCountry(id: $deleteFavoriteCountryId) {
      id
    }
  }
`;

export const UPDATE_FAVORITE_COUNTRY_MUTATION = gql`
  mutation UpdateFavoriteCountry(
    $updateFavoriteCountryId: ID!
    $notes: String
  ) {
    updateFavoriteCountry(id: $updateFavoriteCountryId, notes: $notes) {
      id
    }
  }
`;
