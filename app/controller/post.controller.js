const mongoose = require('mongoose');
const Post = require('../model/post.model');
const multer = require('multer');
const fs = require('fs');
const path = require('path');


const allposts = (req,res) => {
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

const postsubmit  = (req,res) => {
    console.log('postsubmit called');
    console.log(req.file);
    console.log(req.file.filename);
    const post = new Post({
        _id : new mongoose.Types.ObjectId(),
        title   : req.body.title,
        author : req.body.author,
        body : req.body.body,
        is_private : req.body.is_private,
        attachments : [
            {
             file : req.file.filename,
             type : req.file.mimetype,
             path : req.file.path,
             size : req.file.size   
            }
        ]
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