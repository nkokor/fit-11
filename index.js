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
        req.session.cart = [];
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

app.get("/user", function(req, res) {
  res.setHeader('Content-type', 'application/json');
  if(req.session.username == null) {
    let message = {"error":"User not logged in"};
    res.status(403);
    res.send(JSON.stringify(message));
  } else {
    db.user.findOne({where:{username:req.session.username}}).then(u => {
      let user = {"username":req.session.username, "profileImage":u.image};
      res.status(200);
      res.send(JSON.stringify(user));
    });
  }
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
            db.user.create({username:req.body.username, email:req.body.email, password_hash:hash, image:"/user.jpg"});
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
      productObjects.push({title:products[i].title, price:products[i].price, image:products[i].image, availability:products[i].availability, rating:products[i].rating});
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

app.get("/cart", function(req, res) {
  if(req.session.username == null) {
    res.status(403);
    res.setHeader('Content-type', 'application/json');
    let message = {"message":"User not logged in!"};
    res.send(JSON.stringify(message));
  } else {
    res.status(200);
    res.setHeader('Content-type', 'application/json');
    res.send(JSON.stringify(req.session.cart));
  }
});

app.post(/\/add\/.*/, function(req, res) {
  res.setHeader('Content-type', 'application/json');
  if(req.session.username == null) {
    res.status(403);
    let message = {"error":"User not logged in!"};
    res.send(JSON.stringify(message));
  } else {
    let item = decodeURI(req.url).replace("/add/", '');
    db.product.findOne({where:{title:item}}).then(product => {
      if(product == null) {
        res.status(403);
        let message = {"error":"Item not found."};
        res.send(JSON.stringify(message));
      } else {
        let newAvailability = product.availability - 1;
        db.product.update({availability:newAvailability}, {where:{title:item}}).then(p => {
          res.status(200);
          let itemIsInCart = false;
          for(let i = 0; i < req.session.cart.length; i++) {
            if(req.session.cart[i].title == item) {
              req.session.cart[i].quantity += 1;
              itemIsInCart = true;
              break;
            }
          }
          if(itemIsInCart == false) {
            req.session.cart.push({title:item, price:product.price, image:product.image, quantity:1, availability:newAvailability});
          }   
          res.send(JSON.stringify(req.session.cart));
        });
      }
    });
  }
});

app.post(/\/remove\/.*/, function(req, res) {
  res.setHeader('Content-type', 'application/json');
  let item = decodeURI(req.url).replace("/remove/", '');
  db.product.findOne({where:{title:item}}).then(product => {
    if(product != null) {
      db.product.update({availability:product.availability+1}, {where:{title:product.title}}).then(p => {
        for(let i = 0; i < req.session.cart.length; i++) {
          if(req.session.cart[i].title == item) {
            req.session.cart.splice(i, 1);
            break;
          }
        }
        res.status(200);
        res.send(JSON.stringify(req.session.cart));
      });
    } else {
      let message = {"message":"Item not found!"};
      res.status(404);
      res.send(JSON.stringify(message));
    }
  });
});

app.get(/\/product\/.*/, function(req, res) {
  res.setHeader('Content-type', 'application/json');
  let productTitle = decodeURI(req.url).replace('/product/', '');
  db.product.findOne({where:{title:productTitle}}).then(product => {
    if(product != null) {
      let productObject = {"title":productTitle, "info":product.description, "image":product.image, "price":product.price, "availability":product.availability, "rating":product.rating};
      res.status(200);
      res.send(JSON.stringify(productObject));
    } else {
      res.status(403);
      res.send(JSON.stringify({"error":"Product not found"}));
    }
  });
});

app.post(/\/plus\/.*/, function(req, res) {
  res.setHeader('Content-type', 'application/json');
  let item = decodeURI(req.url).replace("/plus/", '');
  db.product.findOne({where:{title:item}}).then(product => {
    if(product != null) {
      if(product.availability > 0) {
        let newAvailability = product.availability - 1;
        db.product.update({availability:newAvailability}, {where:{title:item}}).then(p => {
          for(let i = 0; i < req.session.cart.length; i++) {
            if(req.session.cart[i].title == item) {
              req.session.cart[i].quantity += 1;
              req.session.cart[i].availability = newAvailability;
              break;
            }
          }
          res.status(200);
          res.send(JSON.stringify(req.session.cart));
        });
      } else {
        res.status(404);
        res.send(JSON.stringify({"error": "Product is out of stock!"}));
      }
    }
  });
});

app.post(/\/minus\/.*/, function(req, res) {
  let item = decodeURI(req.url).replace("/minus/", '');
  res.setHeader('Content-type', 'application/json');
  db.product.findOne({where:{title:item}}).then(product => {
    if(product != null) {
      let decreased = false;
      for(let i = 0; i < req.session.cart.length; i++) {
        if(req.session.cart[i].title == item) {
          if(req.session.cart[i].quantity > 1) {
            req.session.cart[i].quantity -= 1;
            decreased = true;
          } 
          break;
        }
      }
      if(decreased == false) {
        res.status(404);
        res.send(JSON.stringify({"error":"Quantity cannot be decreased!"}));
      } else {
        let newAvailability = product.availability + 1;
        db.product.update({availability:newAvailability}, {where:{title:item}}).then(p => {
          if(p != null) {
            for(let i = 0; i < req.session.cart.length; i++) {
              if(req.session.cart[i].title == p.title) {
                req.session.cart[i].availability = newAvailability;
                break;
              }
            }
            res.status(200);
            res.send(JSON.stringify(req.session.cart));
          }
        });
      }
    }
  });
});

app.listen(3000);
