let bcrypt = require('bcrypt');

//for nkokor
bcrypt.hash("pass", 10, function(err, hash) {
  console.log(hash);
});