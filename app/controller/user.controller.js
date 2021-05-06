"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var User = require("../model/user.model");
var jwt = require("jsonwebtoken");
var allusers = function (req, res) {
    var data = jwt.verify(req.headers.token, String(process.env.TOKEN_SECRET), function (err, decoded) {
        if (err) {
            res.status(500).json({
                'msg': 'token not valid'
            });
        }
        else {
            User.find().exec().then(function (docs) {
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
        }
    });
};
var checkUser = function (req, res) {
    User.findOne({ uname: req.body.uname, isactive: true }, function (err, doc) {
        if (err) {
            console.log(err);
        }
        else {
            if (doc != null) {
                res.status(200).json({
                    code: 500,
                    msg: 'User name already registred'
                });
            }
            else {
                res.status(200).json({
                    code: 200,
                    msg: 'User name available'
                });
            }
        }
    });
};
var createUser = function (req, res) {
    var user = new User({
        _id: new mongoose.Types.ObjectId(),
        fname: req.body.fname,
        mname: req.body.mname,
        lname: req.body.lname,
        uname: req.body.uname,
        dob: req.body.dob,
        gender: req.body.gender,
        email: req.body.email,
        contact: req.body.contact,
        password: req.body.password
    });
    User.findOne({ contact: String(req.body.contact), isactive: true }, function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            if (docs != null) {
                console.log("result - " + docs);
                res.status(200).json({
                    'code': 502,
                    'msg': 'Contact no already register.'
                });
            }
            else {
                user.save().then(function (result) {
                    var verificationCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
                    User.findOneAndUpdate({ _id: result._id }, { 'verificationcode': verificationCode }, {
                        "new": true
                    }, function (err, newDoc) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.status(201).json({
                                code: 201,
                                message: 'OTP send to your contact no.'
                            });
                        }
                    });
                })["catch"](function (err) {
                    res.status(500).json({
                        error: err
                    });
                });
            }
        }
    });
};
module.exports = {
    allusers: allusers,
    createUser: createUser,
    checkUser: checkUser
};
