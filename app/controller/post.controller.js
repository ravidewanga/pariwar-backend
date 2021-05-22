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
    let msg = [];
    if(req.body.title == '' || req.body.title == undefined || req.body.title === null){
        let temp = {};
        temp['title'] = 'title parameter missing';
        msg.push(temp);
    }
    if(req.body.author == ''|| req.body.author == undefined || req.body.author === null){
         let temp = {};
         temp['author'] = 'author parameter missing';
        msg.push(temp);   
    }
    if(req.body.body == ''|| req.body.body == undefined || req.body.body === null){
        let temp = {};
        temp['body'] = 'body parameter missing';
       msg.push(temp);   
   }
    if(msg.length > 0){
        res.status(500).json({
                code : 500,
                msg : msg
        });
    }

    console.log('postsubmit called');
    console.log(req.file);
    const post = new Post({
        _id : new mongoose.Types.ObjectId(),
        title   : req.body.title,
        author : req.body.author,
        body : req.body.body,
        is_private : req.body.is_private,

        attachments : [
            {
             file : typeof req.file != 'undefined' ? req.file.filename : null,
             type : typeof req.file != 'undefined' ? req.file.mimetype : null,
             path : typeof req.file != 'undefined' ? req.file.path : null,
             size : typeof req.file != 'undefined' ? req.file.size : null   
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