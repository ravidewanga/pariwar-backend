const mongoose = require("mongoose");

const postScheme = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    title   : { type: String, required: true },
    author : String,
    body : String,
    likes : [{ 
        //user_id: Schema.Types.ObjectId, ref: 'User',
        created_at : { type : Date, default: Date.now }
    }],
    img:
    {
        data: Buffer,
        contentType: String
    },
    //comments : { type: Number, default: 0},
    //attachment : { type : String, default: null },
    attachments : [{
        "file" : { type : String, default: null },
        "type" : { type : String, default: null },
        "path" : { type : String, default: null },
        "size" : { type : Number, default: null },
        }],
    is_private : { type : Boolean, default: false },
    is_active : { type : Boolean, default: true },
    create_at : { type : Date, default: Date.now },
    Updated_at : { type : Date, default: null }
});

module.exports = mongoose.model('Post',postScheme);