"use strict";

const express = require("express")
const router = express.Router();
const controller = require("../../../../../controllers/Api/v1/user/categoryController");
const Msg = require("../../../../../helpers/localization");
const { param,query } = require("express-validator");
const { authenticateUser } = require("../../../../../helpers/middleware");

router.get(
    "/list/category",authenticateUser,
    query("search").optional().isString(),
    query("page").optional().toInt(),
    query("perPage").optional().toInt(),
    controller.listCategory
);

router.get(
    "/category/detail/:id",authenticateUser,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_CATEGORY_ID),
    controller.categoryDetail
);

module.exports = router;