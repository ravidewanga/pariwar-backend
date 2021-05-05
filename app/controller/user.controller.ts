import {Application,Request,Response,NextFunction} from 'express';
import * as mongoose from "mongoose";
import * as User from '../model/user.model';
import * as jwt from "jsonwebtoken";

const allusers = (req:Request,res:Response) => {
    var data = jwt.verify(req.headers.token,String(process.env.TOKEN_SECRET),(err,decoded)=>{
        if(err){
            console.log('token invalid');
            res.status(500).json({
                'msg' : 'token not valid'
            });
        }
        res.send(decoded);
    });
    User.find()
    .exec()
    .then(docs => {
        if(docs.length >= 0){
            res.status(200).json(docs);
        } else {
			res.status(200).json({'code':503,'msg':'No record found'});
        }
    })
    .catch(err => {
        res.status(500).json({
            error:err
        });
    });
};

const createUser = (req:Request,res:Response) => {
    const user = new User({
        _id : new mongoose.Types.ObjectId(),
        fname : req.body.fname,
        mname : req.body.mname,
        lname : req.body.lname,
        uname : req.body.uname,
        dob : req.body.dob,
        gender : req.body.gender,
        email : req.body.email,
        contact : req.body.contact,
        password : req.body.password
    });

    User.findOne({contact:String(req.body.contact) ,isactive:true},function(err:any,docs:any){
        if (err){
            console.log(err)
        }
        else{
            if(docs != null){
                console.log(`result - ${docs}`);
                res.status(200).json({
                    'code' : 502,
                    'msg' : 'Contact no already register.'
                });
            } else {
                user.save().then(result => {
                    user.varificationcode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
                    res.status(201).json({
                        code : 200,
                        message: 'OTP send to your contact no.',
                        //post : result
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error : err
                    });
                });
            }
        }
    });
};

module.exports = {
    allusers,
    createUser
}