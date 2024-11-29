const express = require("express");
const routes = express.Router();
const adminctl = require("../controller/adminctl");
const auth = require("../config/adminauth")
const multer = require("multer");
const Storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploades/admin')
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() )
    }
})

const upload = multer({storage : Storage}).single("image")

routes.post("/addadmin",upload,adminctl.addadmin)
routes.post("/logadmin",adminctl.logadmin);
routes.get("/viewadmin", auth ,adminctl.viewadmin)




module.exports = routes;    