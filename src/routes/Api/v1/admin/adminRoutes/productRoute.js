"use strict";

const express = require('express');
const router = express.Router();
const controller = require("../../../../../controllers/Api/v1/admin/productController");
const Msg = require("../../../../../helpers/localization");
const { body,param,query } = require("express-validator");
const { authenticateAdmin } = require("../../../../../helpers/middleware");

/**
 * This route add a new product
 */
router.post(
    "/add/product",authenticateAdmin,
    body("name")
        .notEmpty()
        .withMessage(Msg.PRODUCT_NAME_REQUIRED),
    body("categoryId")
        .notEmpty()
        .withMessage(Msg.CATEGORY_ID_REQUIRED)
        .isMongoId()
        .withMessage(Msg.INVALID_CATEGORY_ID),
    body("subCategoryId")
        .notEmpty()
        .withMessage(Msg.SUB_CATEGORY_ID_REQUIRED)
        .isMongoId()
        .withMessage(Msg.INVALID_SUB_CATEGORY_ID),
    body("brandId")
        .notEmpty()
        .withMessage(Msg.BRAND_ID_REQUIRED)
        .isMongoId()
        .withMessage(Msg.INVALID_BRAND_ID),
    body("price")
        .notEmpty()
        .withMessage(Msg.PRODUCT_PRICE_REQUIRED),
    body("description")
        .notEmpty()
        .withMessage(Msg.PRODUCT_DESCRIPTION_REQUIRED),
    body("size")
        .notEmpty()
        .withMessage(Msg.PRODUCT_SIZE_REQUIRED),
    body("color")
        .notEmpty()
        .withMessage(Msg.PRODUCT_COLOR_REQUIRED),
    body("stock")
        .notEmpty()
        .withMessage(Msg.PRODUCT_STOCK_REQUIRED),
    controller.addProduct
);

module.exports = router;