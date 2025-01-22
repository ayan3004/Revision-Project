const  mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/crudtask")

 const db = mongoose.connection;

 
 db.once("open",(err)=>{
if(err){
    console.log("Database not connect")
}else{
    console.log("Database connected")
}
 })
 
 module.exports = db;