const mongoose = require("mongoose");
const Post = require('../model/post.model');

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

const postsubmit = (req,res) => {
    const post = new Post({
        _id : new mongoose.Types.ObjectId(),
        title   : req.body.title,
        author : req.body.author,
        body : req.body.body,
        is_private : req.body.is_private
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