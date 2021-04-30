const mongoose = require("mongoose");
const User = require('../model/user.model');

const allusers = (req,res) => {
    console.log('all users');
    User.find()
    .exec()
    .then(docs => {
        if(docs.length >= 0){
            res.status(200).json({'code':503,'msg':'No record found'});
        } else {
            res.status(200).json(docs);
        }
    })
    .catch(err => {
        res.status(500).json({
            error:err
        });
    });
};

const createUser = (req,res) => {
    const user = new User({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        age : req.body.age,
    });
    user.save().then(result => {
        res.status(201).json({
            message: 'user created',
            post : result
        });
    })
    .catch(err => {
        res.status(500).json({
            error : err
        });
    });
};


module.exports = {
    allusers,
    createUser
}