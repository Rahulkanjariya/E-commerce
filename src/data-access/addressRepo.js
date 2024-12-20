"use strict";

const addressModel = require("../models/address");

async function getDetail(filter) {
    const detail = await addressModel.findOne(filter).exec();
    return detail;
}

async function list(query, skip, limit) {
    const list = await addressModel
        .find(query)
        // .populate("userId", "firstName lastName mobileNumber -_id")
        .skip(skip)
        .limit(limit)
    const total = await addressModel.find(query).countDocuments().exec();
    return { list, total };
}

async function create(detail) {
    const data = new addressModel(detail);
    const newData = await data.save();
    return newData;
}

async function update(userId, detail) {
    const data = await addressModel.findByIdAndUpdate(
        userId, 
        detail, 
        { new: true }
    );
    return data;
}

async function deleteAddress(userId) {
    const data = await addressModel.findByIdAndDelete(userId).exec();
    return data;
}

module.exports = {
    getDetail,
    list,
    create,
    update,
    deleteAddress
};