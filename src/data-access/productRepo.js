"use strict";

const productModel = require("../models/product");

async function getDetail(filter) {
    const detail = await productModel.findOne({ ...filter, isActive: true }).exec();
    return detail;
}

async function list(filters = {}, skip, limit, sort = {}) {
    filters.isActive = true;
    const pipeline = [
        { $match: filters },
        {
            $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "_id",
                as: "categoryDetail"
            }
        },
        {
            $lookup: {
                from: "subcategories",
                localField: "subCategoryId",
                foreignField: "_id",
                as: "subCategoryDetail"
            }
        },
        {
            $lookup: {
                from: "brands",
                localField: "brandId",
                foreignField: "_id",
                as: "brandDetail"
            }
        },

        {
            $unwind: {
                path: "$categoryDetail",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $unwind: {
                path: "$subCategoryDetail",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $unwind: {
                path: "$brandDetail",
                preserveNullAndEmptyArrays: true
            }
        },

        {
            $project: {
                _id: 1,
                name: 1,
                price: 1,
                size: 1,
                color: 1,
                "categoryDetail.name": 1,
                "subCategoryDetail.name": 1,
                "brandDetail.name": 1,
            }
        },

        { $sort: sort },
        { $skip: skip },
        { $limit: limit }
    ];

    const list = await productModel.aggregate(pipeline).exec();
    const total = await productModel.countDocuments(filters).exec();
    return { list, total };
}

async function create(detail) {
    const data = new productModel(detail);
    const newData = await data.save();
    return newData;
}

async function update(productId, detail) {
    const data = await productModel.findByIdAndUpdate(
        productId, 
        detail, 
        { new: true }
    );
    return data;
}

async function deleteProduct(productId) {
    const productInfo = {
        name: "",
        price: 0,
        description: "",
        image: "",
        size: [],
        color: [],
        stock: 0,
        isActive: false
    };

    const product = await productModel.findOneAndUpdate(
        { _id: productId, isActive: true },
        productInfo,
        { new: true }
    ).exec();

    return product;
}

module.exports = {
    getDetail,
    list,
    create,
    update,
    deleteProduct,
}