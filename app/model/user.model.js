const mongoose = require("mongoose");

const userScheme = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : String,
    age : Number,
});

module.exports = mongoose.model('User',userScheme);