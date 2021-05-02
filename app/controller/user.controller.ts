import {Application,Request,Response,NextFunction} from 'express';
import * as mongoose from "mongoose";
import * as User from '../model/user.model';
import * as jwt from "jsonwebtoken";

const allusers = (req:Request,res:Response) => {
    var data = jwt.verify(req.headers.token,'00rah0ul');
    console.log(data);
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