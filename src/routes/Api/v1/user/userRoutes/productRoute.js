"use strict";

const express = require('express');
const router = express.Router();
const controller = require("../../../../../controllers/Api/v1/user/productController");
const Msg = require("../../../../../helpers/localization");
const { param,query } = require("express-validator");
const { authenticateUser } = require("../../../../../helpers/middleware");

router.get(
    "/list/product",authenticateUser,
    query("search").optional().isString(),
    query("page").optional().toInt(),
    query("perPage").optional().toInt(),
    controller.listProduct
);

router.get(
    "/product/detail/:id",authenticateUser,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_PRODUCT_ID),    
    controller.productDetail
);

module.exports = router;