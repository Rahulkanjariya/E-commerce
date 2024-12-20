"use strict";

const categoryModel = require("../models/category");

async function getDetail(filter) {
    const detail = await categoryModel.findOne({ ...filter, isActive: true }).exec();
    return detail;
}

async function list(query, skip, limit, sort) {
    query.isActive = true;
    const list = await categoryModel
        .find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec();
    const total = await categoryModel.find(query).countDocuments().exec();
    return { list, total };
}

async function create(detail) {
    const data = new categoryModel(detail);
    const newData = await data.save();
    return newData;
}

async function update(categoryId, detail) {
    const data = await categoryModel.findByIdAndUpdate(
        categoryId, 
        detail, 
        { new: true }
    );
    return data;
}

async function deleteCategory(categoryId) {
    const categoryInfo = {
        name: "",
        isActive: false
    };

    const category = await categoryModel.findOneAndUpdate(
        { _id: categoryId, isActive: true },
        categoryInfo,
        { new: true }
    ).exec();

    return category;
}

module.exports = {
    getDetail,
    list,
    create,
    update,
    deleteCategory,
};