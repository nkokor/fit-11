function addData(db){
  return new Promise(function(resolve, reject) {
    db.user.create({username:"nkokor", email:"nkokor@icloud.com", password_hash:"$2b$10$oClpeF2urcPqEtSWGJJJAeMbR/HR1zP/T9kPl8eCgmYEEcKHF2awa"});
    db.product.create({title:"Workout band set", price:40, availability:25, image:"/bands.jpg", description:"Set of 3 different level workout bands. Ideal for glute activation and leg day warm up."});
    db.product.create({title:"Pilates ball", price:20, availability:25, image:"/ball.jpg", description: "20 cm mini ball for yoga, pilates, rehab and stretching."});
    db.product.create({title:"Set of dumbbels, 10Lbs", price:55, availability:25, image:""});
    db.product.create({title:"Olympic barbell", price:60, availability:25, image:""});
    db.product.create({title:"Workout mat", price:30, availability:25, image:"/mat.jpg"});
    db.product.create({title:"Water bottle", price:9.95, availability:25, image:""});
    }).catch(function(error){
      console.log("Database error " + error);
    });
}

module.exports=addData;


