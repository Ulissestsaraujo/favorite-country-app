const { DataTypes } = require("sequelize");
const { sequelize } = require("./db.js");
const User = require("./User");

const FavoriteCountry = sequelize.define("FavoriteCountry", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  country_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  notes: {
    type: DataTypes.TEXT,
  },
});

module.exports = FavoriteCountry;
