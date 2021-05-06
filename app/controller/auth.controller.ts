import {Application,Request,Response,NextFunction} from 'express';
import * as mongoose from "mongoose";
import * as User from '../model/user.model';
import * as jwt from "jsonwebtoken";
import { any } from 'sequelize/types/lib/operators';

const login = (req:Request,res:Response) => {
    const user = User.findOne(
        {   password : req.body.password,
            isactive:true,
            $or : [
                {email :req.body.identity},
                {contact :req.body.identity},
            ],
            
        }, async function (err:any, docs:any) {
        if (err){
            console.log(err)    
        }
        else{
            if(docs != null){
                const token = jwt.sign({ _id : docs._id },String(process.env.TOKEN_SECRET));
                await User.findOneAndUpdate({_id:docs._id},{lastlogin : Date.now()},{new:true},function(err:any,newDoc:any){
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

const otpVerify = (req:Request,res:Response) => {
    User.findOne(
        {   contact : req.body.contact,
            verificationcode : parseInt(req.body.otp)
        }, 
        async function (err:any, docs:any) {
        if (err){
            console.log(err)    
        }
        else{
            const token = jwt.sign({ _id : docs._id},String(process.env.TOKEN_SECRET));
            
            var newDoc = await User.findOneAndUpdate({_id : docs._id}, {
                'isactive' : true,
                'lastlogin' : Date.now()
            }, {
                new: true
              },function(err:any,newDoc:any){
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