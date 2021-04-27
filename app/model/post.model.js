const mongoose = require("mongoose");

const postScheme = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    title   : { type: String, required: true },
    author : String,
    body : String,
    //likes : { type: Number, default: 0},
    //comments : { type: Number, default: 0},
    attachment : { type : String, default: null },
    is_private : { type : Boolean, default: false },
    is_active : { type : Boolean, default: true },
    create_at : { type : Date, default: Date.now },
    Updated_at : { type : Date, default: null },
});

module.exports = mongoose.model('Post',postScheme);