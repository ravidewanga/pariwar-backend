//import { GroupModel } from '../models/Group.Models'
//import { NOT_FOUND, OK, CREATED, NOT_ACCEPTABLE, NOT_MODIFIED } from 'http-status-codes'
//import { prepareError } from '../utils/functions';

const {GroupModel} = require('../model/group.model');
const { NOT_FOUND, OK, CREATED, NOT_ACCEPTABLE, NOT_MODIFIED } = require('http-status-codes');

const createGroup = async (req, res) => {
    try {
        if (req?.body?.name?.trim()?.length === 0) {
            res.status(NOT_ACCEPTABLE).send({ error: "Name cannot be empty" })
        }
        const group = await GroupModel.create({
            user: req.user.id,
            name: req.body.name,
            description: req?.body?.description ?? '',
            type: req.body.type,
            members: [req.user.id],
            admins: [req.user.id],
            moderators: [],
        })
        if (group) {
            return res.status(CREATED).send({ data: group })
        }
        return res.status(NOT_ACCEPTABLE).send({ data: "Cannot Create" })
    } catch (error) {
        res.status(NOT_ACCEPTABLE).send({ error: error.message })
    }
}

const getGroup = async (req, res) => {
    try {
        const group = await GroupModel
            .findOne({ _id: req.params.id, "members": { "$in": [req.user.id] } })
            .populate('members', '-password -createdAt -updatedAt')
            .populate('user', '-password -createdAt -updatedAt')
            .populate('admins', '-password -createdAt -updatedAt')
            .populate('modaretors', '-password -createdAt -updatedAt')
        if (group) {
            return res.status(OK).send({ data: group })
        }
        return res.status(NOT_FOUND).send({ error: "Not Found" })
    } catch (error) {
        res.status(NOT_FOUND).send({ error: error })
    }
}

const getGroups = async (req, res) => {
    try {
        const groups = await GroupModel.find({ members: [req.user.id] });
        if (groups) {
            return res.status(OK).send({ data: groups })
        }
        res.status(NOT_FOUND).send({ error: "Not Found" })
    } catch (error) {
        res.status(NOT_FOUND).send({ error: error })
    }
}


const updateGroup = async (req, res) => {
    if ((!req.body.name && !req.body.description && !req.body.type) || req?.body?.name?.trim()?.length === 0) {
        return res.status(NOT_ACCEPTABLE).send(prepareError('No request body', 'body', 'tracked'));
    }
    try {
        const group = await GroupModel.findOneAndUpdate(
            { _id: req.params.id, "admins": { "$in": [req.user.id] } },
            { ...req.body },
            { new: true }
        );
        if (group) {
            return res.status(OK).send({ data: group })
        }
        return res.status(NOT_FOUND).send({ error: group })
    } catch (error) {
        res.status(NOT_FOUND).send({ error: error })
    }
}

const addMember = async (req, res) => {
    if (!req?.params?.id || !req?.body?.member) {
        return res.status(NOT_ACCEPTABLE).send({ error: 'ID and member needed' })
    }
    const status = await GroupModel.findOneAndUpdate({ _id: req.params.id, admins: [req.user.id] }, { "$addToSet": { "members": req.body.member } }, {new: true});
    if (status) {
        return res.status(OK).send({ data: status });
    }
    return res.status(NOT_MODIFIED).send({ error: "Not Modified" });
}

const removeMember = async (req, res) => {
    if (!req?.params?.id || !req?.body?.member) {
        return res.status(NOT_ACCEPTABLE).send({ error: 'ID and member needed' })
    }

    const status = await GroupModel.findOne({ _id: req.params.id, admins: { "$in": [req.body.member] } })
    const status2 = await GroupModel.findOne({ _id: req.params.id, moderators: { "$in": [req.body.member] } })

    if (status || status2) {
        return res.status(NOT_ACCEPTABLE).send({ error: 'This person cannot be removed' })
    }

    const group = await GroupModel.updateOne({ _id: req.params.id, admins: [req.user.id] }, { "$pull": { "members": req.body.member } });

    if (group) {
        return res.status(OK).send({ data: group });
    }
    return res.status(NOT_MODIFIED).send({ error: "Unable to add" })
}

const addModerator = async (req, res) => {
    if (!req.params.id || !req.body.member) {
        return res.status(NOT_ACCEPTABLE).send({ error: 'ID and moderator needed' })
    }
    const status = await GroupModel.findOne({ _id: req.params.id, "members": { "$in": [req.body.member] } })

    if (!status) {
        return res.status(NOT_ACCEPTABLE).send({ error: 'This person cannot be added' })
    }

    const group = await GroupModel.updateOne({ _id: req.params.id, admins: [req.user.id] }, { "$addToSet": { "moderators": req.body.member } });

    if (group) {
        return res.status(OK).send({ data: group });
    }
    return res.status(NOT_MODIFIED).send({ error: "Unable to add" })
}

const removeModerator = async (req, res) => {
    if (!req.params.id || !req.body.member) {
        return res.status(NOT_ACCEPTABLE).send({ error: 'ID and moderator needed' })
    }

    const moderator = await GroupModel.updateOne({ _id: req.params.id, admins: [req.user.id] }, { "$pull": { "moderators": req.body.member } });

    if (moderator) {
        return res.status(OK).send({ data: moderator });
    }
    return res.status(NOT_MODIFIED).send({ error: "Unable to add" })
}

const addAdmin = async (req, res) => {
    if (!req.params.id || !req.body.member) {
        return res.status(NOT_ACCEPTABLE).send({ error: 'ID and moderator needed' })
    }

    const status = await GroupModel.findOne({ _id: req.params.id, "members": { "$in": [req.body.member] } });

    if (!status) {
        return res.status(NOT_ACCEPTABLE).send({ error: 'This person cannot be added' })
    }

    const group = await GroupModel.updateOne({ _id: req.params.id, admins: [req.user.id] }, { "$addToSet": { "admins": req.body.member } });

    if (group) {
        return res.status(OK).send({ data: group });
    }
    return res.status(NOT_MODIFIED).send({ error: "Unable to add" })
}

const removeAdmin = async (req, res) => {
    if (!req.params.id || !req.body.member) {
        return res.status(NOT_ACCEPTABLE).send({ error: 'ID and moderator needed' })
    }
    const status = GroupModel.updateOne({ _id: req.params.id, admins: [req.user.id] }, { "$pull": { "admins": req.body.member } });
    if (status) {
        return res.status(OK).send({ data: status });
    }
    return res.status(NOT_MODIFIED).send({ error: "Unable to add" })
}

module.exports = {
    createGroup,
    getGroup,
    getGroups,
    updateGroup,
    addMember,
    removeAdmin,
    removeMember,
    addModerator,
    removeModerator,
    addAdmin
}