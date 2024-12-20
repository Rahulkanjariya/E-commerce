"use strict";

const subCategoryModel = require("../models/subCategory");

async function getDetail(filter) {
    const detail = await subCategoryModel.findOne({ ...filter, isActive: true }).exec();
    return detail;
}

async function list(query, skip, limit, sort) {
    query.isActive = true;
    const list = await subCategoryModel
        .find(query)
        .populate("categoryId", "name -_id")
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec();
    
    const total = await subCategoryModel.find(query).countDocuments().exec();
    return { list, total };
}

async function create(detail) {
    const data = new subCategoryModel(detail);
    const newData = await data.save();
    return newData;
}

async function update(subCategoryId, detail) {
    const data = await subCategoryModel.findByIdAndUpdate(
        subCategoryId, 
        detail, 
        { new: true }
    );
    return data;
}

async function deleteSubCategory(subCategoryId) {
    const subCategoryInfo = {
        name: "",
        isActive: false
    };

    const subCategory = await subCategoryModel.findOneAndUpdate(
        { _id: subCategoryId, isActive: true },
        subCategoryInfo,
        { new: true }
    ).exec();

    return subCategory;
}

module.exports = {
    getDetail,
    list,
    create,
    update,
    deleteSubCategory,
};