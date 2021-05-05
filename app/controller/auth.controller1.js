const mongoose = require("mongoose");
const User = require('../model/user.model');
const jwt = require("jsonwebtoken");

const login = (req,res) => {
    const user = User.findOne({password : req.body.password,name:req.body.identity}, function (err, docs) {
        if (err){
            console.log(err)    
        }
        else{
            const token = jwt.sign({ _id : docs._id.toString()},'00rah0ul');
            res.status('200').json({
                userDetail : docs,
                token : token
            });
        }
    });
};

module.exports = {
    login
}