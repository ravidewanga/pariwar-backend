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
            
        }, function (err:any, docs:any) {
        if (err){
            console.log(err)    
        }
        else{
            const token = jwt.sign({ _id : docs._id.toString()},'00rah0ul');
            res.status(200).json({
                userDetail : docs,
                token : token
            });
        }
    });
};

const otpVerify = (req:Request,res:Response) => {
    
    console.log(req.body);
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
            res.status(200).json({
                uname : docs.uname,
                email : docs.email,
                isactive : docs.isactive
                //token : token
            });
        }
    });
}
module.exports = {
    login,
    otpVerify
}