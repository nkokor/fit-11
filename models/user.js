const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('user', {
   username: Sequelize.STRING,
   email: Sequelize.STRING,
   image: Sequelize.STRING,
   password_hash: Sequelize.STRING
  }, {tableName: 'user'});
  return User;
}