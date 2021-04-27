const mongoose = require("mongoose");

const postlikeScheme = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    user_id : { type: Schema.Types.ObjectId, ref: 'User' },
    post_id : { type: Schema.Types.ObjectId, ref: 'Post' },
    like : { type : Boolean, default : false },
    create_at : { type : Date, default: Date.now }
});

module.exports = mongoose.model('Postlike',postlikeScheme);