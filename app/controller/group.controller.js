const mongoose = require("mongoose");
const Group  = require('../model/group.model');
const { NOT_FOUND, OK, CREATED, NOT_ACCEPTABLE, NOT_MODIFIED } = require('http-status-codes');

const createGroup = (req,res) => {
//     let msg = [];
//     if(req.body.fname == '' || req.body.fname < 3 || req.body.fname == undefined || req.body.fname === null){
//         let temp = {};
//         temp['fname'] = 'fname parameter missing';
//         msg.push(temp);
//     }
//     if(req.body.lname == '' || req.body.lname < 3 || req.body.lname == undefined || req.body.lname === null){
//         let temp = {};
//         temp['lname'] = 'lname parameter missing';
//         msg.push(temp);
//     }
//     if(req.body.uname == '' || req.body.uname < 3 || req.body.uname == undefined || req.body.uname === null){
//         let temp = {};
//         temp['uname'] = 'uname parameter missing';
//         msg.push(temp);
//     }
//     if(req.body.dob == '' || req.body.dob == undefined || req.body.dob === null){
//          let temp = {};
//          temp['dob'] = 'dob parameter missing';
//         msg.push(temp);   
//     }
//     if(req.body.gender == '' || req.body.gender == undefined || req.body.gender === null){
//         let temp = {};
//         temp['gender'] = 'gender parameter missing';
//        msg.push(temp);   
//    }
//    if(req.body.email == '' || req.body.email == undefined || req.body.email === null){
//     let temp = {};
//     temp['email'] = 'email parameter missing';
//     msg.push(temp);   
//     }
//     if(req.body.contact == '' || req.body.contact == undefined || req.body.contact === null){
//         let temp = {};
//         temp['contact'] = 'contact parameter missing';
//         msg.push(temp);   
//     }
//     if(req.body.password == '' || req.body.password == undefined || req.body.password === null){
//         let temp = {};
//         temp['password'] = 'password parameter missing';
//         msg.push(temp);   
//     }

//     if(msg.length > 0){
//         res.status(500).json({
//                 code : 500,
//                 msg : msg
//         });
//     }

    const group = new Group({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        description : req.body.description,
        type : req.body.type,
        user : new mongoose.user.ObjectId()
    });

    group.save().then(result => {
        console.log('group created');
    })
    .catch(err => {
        res.status(500).json({
            error : err
        });
    });
};

// const getGroup = async (req, res) => {
//     try {
//         const group = await GroupModel
//             .findOne({ _id: req.params.id, "members": { "$in": [req.user.id] } })
//             .populate('members', '-password -createdAt -updatedAt')
//             .populate('user', '-password -createdAt -updatedAt')
//             .populate('admins', '-password -createdAt -updatedAt')
//             .populate('modaretors', '-password -createdAt -updatedAt')
//         if (group) {
//             return res.status(OK).send({ data: group })
//         }
//         return res.status(NOT_FOUND).send({ error: "Not Found" })
//     } catch (error) {
//         res.status(NOT_FOUND).send({ error: error })
//     }
// }

// const getGroups = async (req, res) => {
//     try {
//         const groups = await GroupModel.find({ members: [req.user.id] });
//         if (groups) {
//             return res.status(OK).send({ data: groups })
//         }
//         res.status(NOT_FOUND).send({ error: "Not Found" })
//     } catch (error) {
//         res.status(NOT_FOUND).send({ error: error })
//     }
// }


// const updateGroup = async (req, res) => {
//     if ((!req.body.name && !req.body.description && !req.body.type) || req?.body?.name?.trim()?.length === 0) {
//         return res.status(NOT_ACCEPTABLE).send(prepareError('No request body', 'body', 'tracked'));
//     }
//     try {
//         const group = await GroupModel.findOneAndUpdate(
//             { _id: req.params.id, "admins": { "$in": [req.user.id] } },
//             { ...req.body },
//             { new: true }
//         );
//         if (group) {
//             return res.status(OK).send({ data: group })
//         }
//         return res.status(NOT_FOUND).send({ error: group })
//     } catch (error) {
//         res.status(NOT_FOUND).send({ error: error })
//     }
// }

// const addMember = async (req, res) => {
//     if (!req?.params?.id || !req?.body?.member) {
//         return res.status(NOT_ACCEPTABLE).send({ error: 'ID and member needed' })
//     }
//     const status = await GroupModel.findOneAndUpdate({ _id: req.params.id, admins: [req.user.id] }, { "$addToSet": { "members": req.body.member } }, {new: true});
//     if (status) {
//         return res.status(OK).send({ data: status });
//     }
//     return res.status(NOT_MODIFIED).send({ error: "Not Modified" });
// }

// const removeMember = async (req, res) => {
//     if (!req?.params?.id || !req?.body?.member) {
//         return res.status(NOT_ACCEPTABLE).send({ error: 'ID and member needed' })
//     }

//     const status = await GroupModel.findOne({ _id: req.params.id, admins: { "$in": [req.body.member] } })
//     const status2 = await GroupModel.findOne({ _id: req.params.id, moderators: { "$in": [req.body.member] } })

//     if (status || status2) {
//         return res.status(NOT_ACCEPTABLE).send({ error: 'This person cannot be removed' })
//     }

//     const group = await GroupModel.updateOne({ _id: req.params.id, admins: [req.user.id] }, { "$pull": { "members": req.body.member } });

//     if (group) {
//         return res.status(OK).send({ data: group });
//     }
//     return res.status(NOT_MODIFIED).send({ error: "Unable to add" })
// }

// const addModerator = async (req, res) => {
//     if (!req.params.id || !req.body.member) {
//         return res.status(NOT_ACCEPTABLE).send({ error: 'ID and moderator needed' })
//     }
//     const status = await GroupModel.findOne({ _id: req.params.id, "members": { "$in": [req.body.member] } })

//     if (!status) {
//         return res.status(NOT_ACCEPTABLE).send({ error: 'This person cannot be added' })
//     }

//     const group = await GroupModel.updateOne({ _id: req.params.id, admins: [req.user.id] }, { "$addToSet": { "moderators": req.body.member } });

//     if (group) {
//         return res.status(OK).send({ data: group });
//     }
//     return res.status(NOT_MODIFIED).send({ error: "Unable to add" })
// }

// const removeModerator = async (req, res) => {
//     if (!req.params.id || !req.body.member) {
//         return res.status(NOT_ACCEPTABLE).send({ error: 'ID and moderator needed' })
//     }

//     const moderator = await GroupModel.updateOne({ _id: req.params.id, admins: [req.user.id] }, { "$pull": { "moderators": req.body.member } });

//     if (moderator) {
//         return res.status(OK).send({ data: moderator });
//     }
//     return res.status(NOT_MODIFIED).send({ error: "Unable to add" })
// }

// const addAdmin = async (req, res) => {
//     if (!req.params.id || !req.body.member) {
//         return res.status(NOT_ACCEPTABLE).send({ error: 'ID and moderator needed' })
//     }

//     const status = await GroupModel.findOne({ _id: req.params.id, "members": { "$in": [req.body.member] } });

//     if (!status) {
//         return res.status(NOT_ACCEPTABLE).send({ error: 'This person cannot be added' })
//     }

//     const group = await GroupModel.updateOne({ _id: req.params.id, admins: [req.user.id] }, { "$addToSet": { "admins": req.body.member } });

//     if (group) {
//         return res.status(OK).send({ data: group });
//     }
//     return res.status(NOT_MODIFIED).send({ error: "Unable to add" })
// }

// const removeAdmin = async (req, res) => {
//     if (!req.params.id || !req.body.member) {
//         return res.status(NOT_ACCEPTABLE).send({ error: 'ID and moderator needed' })
//     }
//     const status = GroupModel.updateOne({ _id: req.params.id, admins: [req.user.id] }, { "$pull": { "admins": req.body.member } });
//     if (status) {
//         return res.status(OK).send({ data: status });
//     }
//     return res.status(NOT_MODIFIED).send({ error: "Unable to add" })
// }

module.exports = {
    createGroup
    // getGroup,
    // getGroups,
    // updateGroup,
    // addMember,
    // removeAdmin,
    // removeMember,
    // addModerator,
    // removeModerator,
    // addAdmin
}