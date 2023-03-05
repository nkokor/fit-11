function addData(db){
  return new Promise(function(resolve, reject) {
    db.user.create({username:"nkokor", password_hash:"$2b$10$oClpeF2urcPqEtSWGJJJAeMbR/HR1zP/T9kPl8eCgmYEEcKHF2awa"});
    }).catch(function(error){
      console.log("Database error " + error);
    });
}

module.exports=addData;


