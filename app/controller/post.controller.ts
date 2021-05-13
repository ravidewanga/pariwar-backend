import {Application,Request,Response,NextFunction} from 'express';
import * as mongoose from "mongoose";
import * as Post from '../model/post.model';
import * as multer from 'multer';
import * as fs from 'fs';
import * as path from 'path';


const allposts = (req:Request,res:Response) => {
    Post.find()
    .exec()
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err => {
        res.status(500).json({
            error:err
        });
    });
};


// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// })

const postsubmit  = (req:Request,res:Response) => {
    const post = new Post({
        _id : new mongoose.Types.ObjectId(),
        title   : req.body.title,
        author : req.body.author,
        body : req.body.body,
        is_private : req.body.is_private,
        
    });
    post.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'document saved',
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
    allposts,
    postsubmit
}