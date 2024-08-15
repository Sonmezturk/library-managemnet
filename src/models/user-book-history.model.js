const { DataTypes } = require("sequelize");
const sequelize = require("../bootstrap/database");

const UserBookHistory = sequelize.define("UserBookHistory", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Books",
      key: "id",
    },
  },
  borrowedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  returnedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = { UserBookHistory };
