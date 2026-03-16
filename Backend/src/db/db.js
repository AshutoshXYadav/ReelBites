const mongoose = require ("mongoose");
function connectDB() {
    mongoose.connect("mongodb://localhost:27017/Zomato")
    .then(
        ()=>{
            console.log("mongoDB connected");
        }
        
    )
}
  module.exports= connectDB;