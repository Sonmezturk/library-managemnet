const { Sequelize } = require("sequelize");

// Setup a new instance of Sequelize with your database configuration
const sequelize = new Sequelize({
  dialect: "sqlite", // You can change this to 'postgres', 'mysql', etc. if you're using a different database
  storage: "library.sqlite", // This is specific to SQLite. For other databases, you would provide the appropriate connection string
  logging: false, // Set to true if you want to see SQL queries in the console
});

// Export the sequelize instance to use it across your application
module.exports = sequelize;
