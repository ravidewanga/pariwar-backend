"use strict";
exports.__esModule = true;
var User = require("../model/user.model");
var jwt = require("jsonwebtoken");
var login = function (req, res) {
    var user = User.findOne({ password: req.body.password,
        isactive: true,
        $or: [
            { email: req.body.identity },
            { contact: req.body.identity },
        ]
    }, function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            var token = jwt.sign({ _id: docs._id.toString() }, '00rah0ul');
            res.status(200).json({
                userDetail: docs,
                token: token
            });
        }
    });
};
var otpVerify = function (req, res) {
    console.log(req.body);
    User.findOne({ contact: req.body.contact,
        verificationcode: parseInt(req.body.otp)
    }, function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("docs - " + docs);
            var token = jwt.sign({ _id: docs._id }, '00rah0ul');
            res.status(200).json({
                //userDetail : docs,
                fname: docs.fname
            });
        }
    });
};
module.exports = {
    login: login,
    otpVerify: otpVerify
};
