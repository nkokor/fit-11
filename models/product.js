const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  const Product = sequelize.define('product', {
   title: Sequelize.STRING,
   price: Sequelize.DOUBLE,
   availability: Sequelize.INTEGER,
   image: Sequelize.STRING,
   description: Sequelize.TEXT
  }, {tableName: 'product'});
  return Product;
}