const express = require('express');
const session = require('express-session');
const bodyParser = require("body-parser");
const fs = require('fs');

const app = express();

app.use(express.static("public/html"));
app.use(express.static("public/css"));
app.use(express.static("public/scripts"));
app.use(express.static("public/images"));

app.use(bodyParser.json());

app.use(session( {
  secret: 'secret password',
  resave: false,
  saveUninitialized: true
}));

const bcrypt = require('bcrypt');

const db = require('./db.js');
const prep = require('./dbPrep.js');


db.sequelize.sync({force:true}).then(function(){
    prep(db).then(function(){
  });
});

app.post("/login", function(req, res) {
  db.user.findOne({where:{username:req.body.username}}).then(function(user){
    res.setHeader('Content-type', 'application/json');
    let message = '';
    let validUser = false;
    if(user != null) {
      validUser = true;
    }
    if(validUser && req.body.password != null) {
      if(bcrypt.compareSync(req.body.password, user.password_hash)) {
        req.session.username = req.body.username;
          message = {"message":"Successful login"};
          res.status(200);
          res.send(JSON.stringify(message));
      }
      else {
        res.status(403);
        message = {"message":"Unsuccessful login"};
        res.send(JSON.stringify(message));
      }
    } else {
      res.status(403);
      message = {"message":"Unsuccessful login"};
      res.send(JSON.stringify(message));
    }
  }).catch(function(error) {
    console.log("Error " + error);
  });
});

app.post("/logout", function(req, res) {
  req.session.destroy();
  res.status(200);
  let message = {"message":"Successful logout"};
  res.setHeader('Content-type', 'application/json');
  res.send(JSON.stringify(message));
});


app.listen(3000);
