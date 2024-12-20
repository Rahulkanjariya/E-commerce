"use strict";

const brandModel = require("../models/brand");

async function getDetail(filter) {
    const detail = await brandModel.findOne(filter).exec();
    return detail;
}

async function list(query, skip, limit, sort) {
    const list = await brandModel
        .find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
    const total = await brandModel.find(query).countDocuments().exec();
    return { list, total };
}

async function create(detail) {
    const data = new brandModel(detail);
    const newData = await data.save();
    return newData;
}

async function update(brandId, detail) {
    const data = await brandModel.findByIdAndUpdate(
        brandId, 
        detail, 
        { new: true }
    )
    return data;
}

async function deleteBrand(brandId) {
    const data = await brandModel.findByIdAndDelete(brandId).exec();
    return data;
}

module.exports = {
    getDetail,
    list,
    create,
    update,
    deleteBrand
}