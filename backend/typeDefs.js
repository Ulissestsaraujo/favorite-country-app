const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }

  type FavoriteCountry {
    id: ID!
    user_id: ID!
    country_id: String!
    notes: String
  }

  type Country {
    id: String!
    name: String!
    capital: String
    population: Int
    flag: String
  }

  type Query {
    users: [User]
    user(id: ID!): User
    countries: [Country]
    country(id: String!): Country
    favoriteCountries(user_id: ID!): [FavoriteCountry]
  }

  type Mutation {
    registerUser(username: String!, password: String!): User!
    loginUser(username: String!, password: String!): User!
    addFavoriteCountry(
      user_id: ID!
      country_id: String!
      notes: String
    ): FavoriteCountry
    deleteFavoriteCountry(id: ID!): FavoriteCountry
    updateFavoriteCountry(id: ID!, notes: String): FavoriteCountry
  }
`;
module.exports = typeDefs;
