const { DataTypes } = require("sequelize");
const sequelize = require("../bootstrap/database");
const { UserBookHistory } = require("./user-book-history.model");

const Book = sequelize.define("Book", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isCurrentlyBorrowed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Book.hasMany(UserBookHistory, {
  foreignKey: "bookId",
  as: "userBookHistory",
});


module.exports = { Book };
