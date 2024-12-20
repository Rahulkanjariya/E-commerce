"use strict";

const reviewModel = require("../models/review");

async function getDetail(filter) {
    const detail = await reviewModel.findOne(filter).exec();
    return detail;
}

async function list(skip, limit) {
    const list = await reviewModel.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "userDetail"
            }
        },
        {
            $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "productDetail"
            }
        },

        {
            $unwind: { 
                path: "$userDetail", 
                preserveNullAndEmptyArrays: true 
            }
        },
        {
            $unwind: { 
                path: "$productDetail", 
                preserveNullAndEmptyArrays: true 
            }
        },

        {
            $project: {
                _id: 1,
                rating: 1,
                comment: 1,
                "userDetail.firstName": 1,
                "userDetail.lastName": 1,
                "productDetail.name": 1,
            }
        },

        { $skip: skip },
        { $limit: limit }
        
    ]);

    const total = await reviewModel.countDocuments().exec();
    return { list, total };
}

async function create(detail) {
    const data = new reviewModel(detail);
    const newData = await data.save();
    return newData;
}

async function update(reviewId, detail) {
    const data = await reviewModel.findByIdAndUpdate(
        reviewId, 
        detail, 
        { new: true }
    )
    return data;
}

async function deleteReview(reviewId) {
    const data = await reviewModel.findByIdAndDelete(reviewId).exec();
    return data;
}

module.exports = {
    getDetail,
    list,
    create,
    update,
    deleteReview
};
