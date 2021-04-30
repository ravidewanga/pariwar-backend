"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var User = require("../model/user.model");
var allusers = function (req, res) {
    console.log('all users');
    User.find()
        .exec()
        .then(function (docs) {
        console.log("doc length-" + docs.length);
        if (docs.length >= 0) {
            res.status(200).json(docs);
        }
        else {
            res.status(200).json({ 'code': 503, 'msg': 'No record found' });
        }
    })["catch"](function (err) {
        res.status(500).json({
            error: err
        });
    });
};
var createUser = function (req, res) {
    var user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        age: req.body.age
    });
    user.save().then(function (result) {
        res.status(201).json({
            message: 'user created',
            post: result
        });
    })["catch"](function (err) {
        res.status(500).json({
            error: err
        });
    });
};
module.exports = {
    allusers: allusers,
    createUser: createUser
};
