const mongoose = require("mongoose");

const postcommentScheme = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    post_id : { type: Schema.Types.ObjectId, ref: 'Post' },
    user_id : { type: Schema.Types.ObjectId, ref: 'User' },
    is_parent : { type : Boolean, default : true},
    comment : { type : String, required : true },
    create_at : { type : Date, default: Date.now },
    updated_at : { type : Date, default: Date.now },
});


module.exports = mongoose.model('postcomment',postlikeScheme);