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

db.user = user;

module.exports=db;
