const admin = require("../model/admin");
const bcrypt = require("bcrypt")
const moment = require("moment")
const jwt = require("jsonwebtoken")

module.exports.addadmin = async (req, res) => {
    let user = await admin.findOne({ email: req.body.email });
    if (user) {
        return res.status(200).json({ msg: "user already exits" })
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);
    req.body.creaedAT = moment().format('LLLL');

    if(req.file){
        req.body.image = req.file.filename
    }
    let data = await admin.create(req.body)
    data ? res.status(200).json({ msg: 'data sent scuccessfully', data }) : res.status(404).json({ msg: 'error for sendin data' })
    console.log(req.body)

}
module.exports.logadmin = async (req, res) => {
    let user = await admin.findOne({ email: req.body.email });
    

    console.log(user)
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            let token = jwt.sign({ userdata: user }, "node", { expiresIn: "1h" })
            console.log(token)
            res.status(200).json({ msg: 'login scuccessfully', token, user })

        } else {
            res.status(404).json({ msg: 'password not match' })
        }
    } else {
        res.status(404).json({ msg: 'user not found' })
    }
}

module.exports.viewadmin = async (req, res) => {
    let data = await admin.find({});
    data ? res.status(200).json({ msg: 'data sent scuccessfully', admindata: data }) : res.status(404).json({ msg: 'error for sendin data' })

}


