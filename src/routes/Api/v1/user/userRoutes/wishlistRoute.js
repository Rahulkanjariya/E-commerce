"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../../../../../controllers/Api/v1/user/wishlistController");
const Msg = require("../../../../../helpers/localization");
const { body,param,query } = require("express-validator");
const { authenticateUser } = require("../../../../../helpers/middleware");

router.post(
    "/add/wishlist",authenticateUser,
    body("userId")
        .notEmpty()
        .withMessage(Msg.USER_ID_REQUIRED)
        .isMongoId()
        .withMessage(Msg.INVALID_USER_ID),
    body("productId")
        .notEmpty()
        .withMessage(Msg.PRODUCT_ID_REQUIRED)
        .isMongoId()
        .withMessage(Msg.INVALID_PRODUCT_ID),
    controller.addToWishList
);

router.get(
    "/list/wishlist",authenticateUser,
    query("page").optional().toInt(),
    query("perPage").optional().toInt(),
    controller.listWishlist
);

router.delete(
    "/remove/wishlist/:id",authenticateUser,
    param("id")
        .notEmpty()
        .isMongoId()
        .withMessage(Msg.INVALID_WISHLIST_ID),
        controller.removeWishlist
);

module.exports = router;