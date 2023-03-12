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
  req.session.username = null;
  req.session.destroy();
  res.status(200);
  let message = {"message":"Successful logout"};
  res.setHeader('Content-type', 'application/json');
  res.send(JSON.stringify(message));
});

app.get("/content", function(req, res) {
  res.setHeader('Content-type', 'application/json');
  if(req.session.username == null) {
    res.status(403);
    let message = {"error":"User is not logged in!"};
    res.send(JSON.stringify(message));
  } else {
    res.status(200);
    let message = {"message": "Successful!"};
    res.send(JSON.stringify(message));
  }
});

app.post("/signup", function(req, res) {
  req.session.destroy();
  res.setHeader('Content-type', 'application/json');
  if(req.body.username == '' || req.body.email == '' || req.body.password == '') {
    res.status(403);
    let message = {"error": "Username is not valid!"};
    res.send(JSON.stringify(message));
  }
  else {
    db.user.findOne({where: {username: req.body.username}}).then(user => {
      if(user != null) {
        res.status(403);
        let message = {"error": "Username is not valid!"};
        res.send(JSON.stringify(message));
      } else {
          bcrypt.hash(req.body.password, 10, function(err, hash) {
            db.user.create({username:req.body.username, email:req.body.email, password_hash:hash});
            res.status(200);
            let message = {"message": "User signed up successfully!"};
            res.send(JSON.stringify(message));
        });
      }
    });
  }
});

app.get("/products", function(req, res) {
  res.setHeader('Content-type', 'application/json');
  db.product.findAll().then(products => {
    let productObjects = [];
    for(let i = 0; i < products.length; i++) {
      productObjects.push({title:products[i].title, price:products[i].price, image:products[i].image, availability:products[i].availability});
    }
    res.status(200);
    res.send(JSON.stringify(productObjects));
  });
});

app.get(/\/search\/.*/, function(req, res) {
  res.setHeader('Content-type', 'application/json');
  let url = decodeURI(req.url);
  let searchProduct = url.replace("/search/", '');
  db.product.findAll().then(products => {
    let productObjects = [];
    for(let i = 0; i < products.length; i++) {
      if(products[i].title.toLowerCase().includes(searchProduct.toLowerCase())){
        productObjects.push({title:products[i].title, price:products[i].price, image:products[i].image, availability:products[i].availability});
      }
    }
    if(productObjects.length == 0) {
      let message = {"message":"No results found."};
      res.status(404);
      res.send(JSON.stringify(message));
    } else {
      res.status(200);
      res.send(JSON.stringify(productObjects));
    }
  });
});

app.listen(3000);
