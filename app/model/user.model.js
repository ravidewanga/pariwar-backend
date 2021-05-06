const mongoose = require("mongoose");
var validator = require('validator');

const userScheme = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    fname : { 
        type: String, 
        required: true,
        trim :true
    },
    mname : { 
        type: String, 
        trim :true
    },
    lname : { 
        type: String, 
        required: true,
        trim :true
     },
    uname : {
        type : String,
        unique: true,
        required: true
    },
    urole : {
        type : String,
        default : 'user'
    },
    dob : { type : Date },
    gender : { 
        type : String,
        required: true
     },
    email : {  
        type : String, 
        required :true,
        trim :true,
        lowercase : true, 
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email not valid');
            }
        }
    },
    contact : { 
        type : String,
        required: true,
        trim : true
    },
    isEmailVerified : {
        type : Boolean,
        default : false,
    },
    password : {
        type : String,
        required : true
    },
    verificationcode : {
        type : String,
        default: null 
    },
    isactive : {
        type : Boolean,
        default : false
    },
    lastlogin : { type : Date },
    create_at : { type : Date, default: Date.now },
    Updated_at : { type : Date, default: null }
});

module.exports = mongoose.model('user',userScheme);