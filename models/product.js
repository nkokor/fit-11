const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  const Product = sequelize.define('product', {
   title: Sequelize.STRING,
   price: Sequelize.DOUBLE,
   availability: Sequelize.INTEGER,
   image: Sequelize.STRING,
   description: Sequelize.TEXT,
   rating: Sequelize.FLOAT,
   ratings_number: Sequelize.INTEGER
  }, {tableName: 'product'});
  return Product;
}