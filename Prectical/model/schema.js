const  mongoose = require("mongoose");

const crudoperation = mongoose.Schema({
    name :{
        type : String,
        require : true
    },
    date :{
        type : Number,
        require : true
    },
    image :{
        type : String,
        require :true
    },
    salary:{
        type : Number,
        require : true
    }
    })
 
const crudschema = mongoose.model("crudoperation",crudoperation);

module.exports = crudschema

