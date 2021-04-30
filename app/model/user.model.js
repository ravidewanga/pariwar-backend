const mongoose = require("mongoose");

const userScheme = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : { type: String, required: true },
    age : Number,
    create_at : { type : Date, default: Date.now },
    Updated_at : { type : Date, default: null }
});

module.exports = mongoose.model('user',userScheme);