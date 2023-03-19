function addData(db){
  return new Promise(function(resolve, reject) {
    db.user.create({username:"nkokor", email:"nkokor@icloud.com", password_hash:"$2b$10$oClpeF2urcPqEtSWGJJJAeMbR/HR1zP/T9kPl8eCgmYEEcKHF2awa", image:"/users/user.jpg"});
    db.product.create({title:"Workout band set", price:40, availability:25, image:"/products/bands.jpg", description:"Set of 3 different level workout bands. Ideal for glute activation and leg day warm up."});
    db.product.create({title:"Pilates ball", price:20, availability:0, image:"/products/ball.jpg", description: "20 cm mini ball for yoga, pilates, rehab and stretching."});
    db.product.create({title:"Set of dumbbells, 20Lbs", price:112, availability:0, image:"/products/dumbbells20.jpg"});
    db.product.create({title:"Dumbbells, full set", price:380, availability:3, image:"/products/dumbbellsset.jpg"});
    db.product.create({title:"Foam roller", price:20, availability:13, image:"/products/roller.jpg"});
    db.product.create({title:"Weight lifting gloves", price:30, availability:25, image:"/products/gloves.jpg"});
    db.product.create({title:"Ankle weights, 7Lbs", price:15, availability:12, image:"/products/ankle.jpg"});
    db.product.create({title:"Set of dumbbells, 10Lbs", price:55, availability:18, image:"/products/dumbbells10.jpg"});
    db.product.create({title:"Olympic barbell", price:60, availability:2, image:"/products/barbell.jpg"});
    db.product.create({title:"Workout mat", price:30, availability:16, image:"/products/mat.jpg"});
    db.product.create({title:"Water bottle, stainless steel", price:9.95, availability:25, image:"/products/bottle.jpg"});
    }).catch(function(error){
      console.log("Database error " + error);
    });
}

module.exports=addData;


