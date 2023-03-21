function addData(db){
  return new Promise(function(resolve, reject) {
    db.user.create({username:"nkokor", email:"nkokor@icloud.com", password_hash:"$2b$10$oClpeF2urcPqEtSWGJJJAeMbR/HR1zP/T9kPl8eCgmYEEcKHF2awa", image:"/users/user.jpg"});
    db.product.create({title:"Workout band set", price:40, availability:25, image:"/products/bands.jpg", description:"Set of 3 different level workout bands. Ideal for glute activation and leg day warm up. Colors may vary. The set comes with a workout ideas booklet. Protectiive case included."});
    db.product.create({title:"Pilates ball", price:20, availability:0, image:"/products/ball.jpg", description: "20 cm mini ball for yoga, pilates, stretching and recovery exercises. Pump not included. Color may vary."});
    db.product.create({title:"Set of dumbbells, 20Lbs", price:112, availability:0, image:"/products/dumbbells20.jpg", description:"Set of 20Lbs rubber coated dumbbells. Great for home or gym workouts."});
    db.product.create({title:"Dumbbells, full set", price:380, availability:3, image:"/products/dumbbellsset.jpg", description:"Comes with 5 pairs of different weight dumbbells. Perfect for a home gym setup. Stand not included. Colors may vary."});
    db.product.create({title:"Foam roller", price:20, availability:13, image:"/products/roller.jpg", description:"Foam massage roller for stretching and recovery. Comes with a net case."});
    db.product.create({title:"Weight lifting gloves", price:30, availability:25, image:"/products/gloves.jpg", description:"Male weightlifting gloves with velcro straps. One size fits all. Stretchy and breathable."});
    db.product.create({title:"Ankle weights, 7Lbs", price:15, availability:12, image:"/products/ankle.jpg", description:"7Lbs ankle weights ideal for mat pilates and home workouts. Great addition to cardio workouts. Protective case included. Color may vary."});
    db.product.create({title:"Set of dumbbells, 10Lbs", price:55, availability:18, image:"/products/dumbbells10.jpg", description:"Set of 10Lbs hex dumbbells with crome handle. Perfect for at home of gym workouts. Rubber coated."});
    db.product.create({title:"Olympic barbell", price:60, availability:2, image:"/products/barbell.jpg", description:"Standard 20kg weightlifting barbell with 700-pound weight capacity"});
    db.product.create({title:"Workout mat", price:30, availability:16, image:"/products/mat.jpg", description:"2cm thick foam workout mat perfect for floor pilates, yoga and stretching. Straps not included."});
    db.product.create({title:"Water bottle, stainless steel", price:9.95, availability:25, image:"/products/bottle.jpg", description:"0.75l stainless steel water bottle. Keeps liquid cold for 12+ hours. Comes with an attachment hook."});
    }).catch(function(error){
      console.log("Database error " + error);
    });
}

module.exports=addData;


