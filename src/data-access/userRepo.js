"use strict";

const userModel = require("../models/user");

async function getDetail(filter) {
    const user = await userModel.findOne({ ...filter, isDeleted: false }).exec();
    return user;
}

async function list(query, skip, limit, sort) {
    query.isDeleted = false;
    const list = await userModel
        .find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
    const total = await userModel.find(query).countDocuments().exec();
    return { list, total };
}

async function create(userInfo) {
    const user = new userModel(userInfo);
    const userData = await user.save();
    return userData;
}

async function update(id, detail) {
    const data = await userModel.findByIdAndUpdate(
        id, 
        detail, 
        { new: true }
    )
    return data;
}

async function deleteUser(id) {
    const userInfo = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        mobileNumber: "",
        dateOfBirth: "",
        gender: "",
        isDeleted: true,
    };

    const user = await userModel.findOneAndUpdate(
        { _id: id, isDeleted: false },
        userInfo, 
        { new: true }
    ).exec();
    return user;
}


module.exports = {
    getDetail,
    list,
    create,
    update,
    deleteUser,
};