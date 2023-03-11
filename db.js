const Sequelize = require("sequelize");
const sequelize = new Sequelize("fit11","root","password",
{
  host:"localhost",
  dialect:"mysql",
  logging:false
});

const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

const user = require("./models/user.js")(sequelize);
const product = require("./models/product.js")(sequelize);

db.user = user;
db.product = product;

module.exports=db;
