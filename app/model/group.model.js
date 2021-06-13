const mongoose = require("mongoose");

const GroupSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
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
        type: mongoose.Schema.Types.ObjectId,
        required: 'User is required',
        ref: 'user'
    },
    members:[{  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    admins:[{
        type: mongoose.Schema.Types.ObjectId,
        required: 'User is required',
        ref: 'user'
    }],
    moderators:[{
        type: mongoose.SchemaTypes.ObjectId,
        // ref: 'user'
    }]

}, {timestamps: true});



//GroupSchema.plugin(require('mongoose-beautiful-unique-validation'));

//export const GroupModel = model('group', GroupSchema)
module.exports = mongoose.model('group',GroupSchema);