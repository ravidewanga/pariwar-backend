"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var Post = require("../model/post.model");
var allposts = function (req, res) {
    Post.find()
        .exec()
        .then(function (docs) {
        res.status(200).json(docs);
    })["catch"](function (err) {
        res.status(500).json({
            error: err
        });
    });
};
var postsubmit = function (req, res) {
    var post = new Post({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        author: req.body.author,
        body: req.body.body,
        is_private: req.body.is_private
    });
    post.save().then(function (result) {
        console.log(result);
        res.status(201).json({
            message: 'document saved',
            post: result
        });
    })["catch"](function (err) {
        res.status(500).json({
            error: err
        });
    });
};
module.exports = {
    allposts: allposts,
    postsubmit: postsubmit
};
