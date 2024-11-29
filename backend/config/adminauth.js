const admin = require("../model/admin")
const jwt = require("jsonwebtoken")

const auth = (req,res,next)=>{
    let token = req.header("Authorization");
    if(!token){
        return res.status(400).json({msg : "unauthorize user"});
        
    }
    let newtoken = token.slice(7,token.length);
    let decode = jwt.verify(newtoken,"node");
    
    req.user = decode;
    
    next();
}

module.exports = auth;