//import {Schema, SchemaTypes, model} from 'mongoose';
//const {Schema, SchemaTypes} = require('mongoose');
const mongoose = require("mongoose");

const GroupSchema = mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: 'Group name is required',
        maxlength: [25, 'Not more than 25 Characters']
    },
    description:{
        type: String,
        trim: true,
        maxlength: [120, 'Not more than 120 Characters']
    },
    type:{
        type: String,
        enum: ["PRIVATE", "PUBLIC", "CLOSED"],
        required: 'Group type is required',
    },
    user:{
        type: mongoose.SchemaTypes.ObjectId,
        required: 'User is required',
        ref: 'user'
    },
    members:[{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    }],
    admins:[{
        type: mongoose.SchemaTypes.ObjectId,
        required: 'User is required',
        ref: 'user'
    }],
    moderators:[{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    }]

}, {timestamps: true});



//GroupSchema.plugin(require('mongoose-beautiful-unique-validation'));

//export const GroupModel = model('group', GroupSchema)
module.exports = mongoose.model('group',GroupSchema);