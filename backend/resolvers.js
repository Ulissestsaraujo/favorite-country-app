const User = require("./models/User");
const FavoriteCountry = require("./models/FavoriteCountry");
const { fetchCountries, fetchCountryById } = require("./fetchCountries");
const jwt = require("jsonwebtoken");

const resolvers = {
  Query: {
    users: () => User.findAll(),
    user: (_, { id }) => User.findByPk(id),
    countries: async () => {
      return await fetchCountries();
    },
    country: async (_, { id }) => {
      const countries = await fetchCountries();
      return countries.find((country) => country.id === id);
    },
    favoriteCountries: async (_, { user_id }) => {
      const favoriteCountries = await FavoriteCountry.findAll({
        where: { user_id },
      });
      return favoriteCountries;
    },
  },
  Mutation: {
    registerUser: async (_, { username, password }) => {
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        throw new Error("Username already exists");
      }
      const user = await User.create({ username, password: password });

      return user;
    },
    loginUser: async (_, { username, password }) => {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        throw new Error("User not found");
      }

      if (password !== user.password) {
        throw new Error("Invalid password");
      }

      return user;
    },
    addFavoriteCountry: (_, { user_id, country_id, notes }) =>
      FavoriteCountry.create({ user_id, country_id, notes }),
    deleteFavoriteCountry: async (_, { id }) => {
      const favoriteCountry = await FavoriteCountry.findByPk(id);
      await favoriteCountry.destroy();
      return favoriteCountry;
    },
    updateFavoriteCountry: async (_, { id, notes }) => {
      const favoriteCountry = await FavoriteCountry.findByPk(id);
      favoriteCountry.notes = notes;
      await favoriteCountry.save();
      return favoriteCountry;
    },
  },
};

module.exports = resolvers;
