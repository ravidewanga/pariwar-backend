const mongoose = require("mongoose");
const User = require('../model/user.model');
const jwt = require("jsonwebtoken");

const login = (req,res) => {
    let msg = [];
    if(req.body.identity == '' || req.body.identity == undefined || req.body.identity === null){
        let temp = {};
        temp['identity'] = 'identity parameter missing';
        msg.push(temp);
    }
    if(req.body.password == '' || req.body.password == undefined || req.body.password === null){
         let temp = {};
         temp['password'] = 'password parameter missing';
        msg.push(temp);   
    }
    if(msg.length > 0){
        res.status(500).json({
                code : 500,
                msg : msg
        });
    }

    const user = User.findOne(
        {   password : req.body.password,
            isactive:true,
            $or : [
                {email :req.body.identity},
                {contact :req.body.identity},
                {uname :req.body.identity},
            ],
            
        }, async function (err, docs) {
        if (err){
            console.log(err)    
        }
        else{
            if(docs != null){
                const token = jwt.sign({ _id : docs._id },String(process.env.TOKEN_SECRET));
                await User.findOneAndUpdate({_id:docs._id},{lastlogin : Date.now()},{new:true},function(err,newDoc){
                    if(err){
                        console.log(err);
                    } else {
                        res.status(200).json({
                            code : 200,
                            role : docs.urole,
                            uname : docs.uname,
                            email : docs.email,
                            isactive : docs.isactive,
                            lastlogin : docs.lastlogin,
                            token : token
                        });
                    }
                });
            } else {
                res.status(401).json({
                    code : 401,
                    msg : 'wrong credentials'
                });
            }
        }
    });
};

const otpVerify = (req,res) => {
    let msg = [];
    if(req.body.contact == '' || req.body.contact.length < 10 || req.body.contact == undefined || req.body.contact === null){
        let temp = {};
        temp['contact'] = 'contact parameter missing';
        msg.push(temp);
    }
    if(req.body.otp == '' || req.body.otp.length == 4 || req.body.otp == undefined || req.body.otp === null){
         let temp = {};
         temp['otp'] = 'otp parameter missing';
        msg.push(temp);   
    }
    if(msg.length > 0){
        res.status(500).json({
                code : 500,
                msg : msg
        });
    }
    
    User.findOne(
        {   contact : req.body.contact,
            verificationcode : parseInt(req.body.otp)
        }, 
        async function (err, docs) {
        if (err){
            res.send('user not exist.');  
        }
        else{
            if(docs == null){
                res.status(500).json({
                    code : 500,
                    msg : 'contact no not exist.'
                });
            } 

            const token = jwt.sign({ _id : docs._id},String(process.env.TOKEN_SECRET));
        
            var newDoc = await User.findOneAndUpdate({_id : docs._id}, {
                'isactive' : true,
                'lastlogin' : Date.now(),
                'verificationcode' : null
            }, {
                new: true
              },function(err,newDoc){
                  if(err){
                    console.log(err)    
                  }
                  else {
                    res.status(200).json({
                        code : 200,
                        role : newDoc.urole,
                        uname : newDoc.uname,
                        email : newDoc.email,
                        isactive : newDoc.isactive,
                        lastlogin : docs.lastlogin,
                        token : token
                    });
                  }
              });
            
        }
    });
}
module.exports = {
    login,
    otpVerify
}