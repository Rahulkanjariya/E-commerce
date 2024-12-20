"use strict";

const wishListModel = require("../models/wishlist");

async function create(detail) {
    const data = new wishListModel(detail);
    const newData = await data.save();
    return newData;
}

async function removeWishlist(wishlistId) {
    const data = await wishListModel.findByIdAndDelete(wishlistId).exec();
    return data;
}

async function list(skip, limit) {
    const list = await wishListModel
        .find()
        .populate("userId", "firstName -_id")
        .populate("productId", "name -_id")
        .skip(skip)
        .limit(limit);
    const total = await wishListModel.countDocuments().exec();
    return { list, total };
}

module.exports = {
    create,
    removeWishlist,
    list
}