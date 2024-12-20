"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../../../../../controllers/Api/v1/admin/categoryController");
const Msg = require("../../../../../helpers/localization");
const { body,param,query } = require("express-validator");
const { authenticateAdmin } = require("../../../../../helpers/middleware");

router.post(
    "/add/category",authenticateAdmin,
    body("name")
        .notEmpty()
        .withMessage(Msg.CATEGORY_NAME_REQUIRED),
    controller.addCategory
);

router.get(
    "/list/category",authenticateAdmin,
    query("search").optional().isString(),
    query("page").optional().toInt(),
    query("perPage").optional().toInt(),
    controller.listCategory
);

router.get(
    "/category/detail/:id",authenticateAdmin,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_CATEGORY_ID),
    controller.categoryDetail
);

router.put(
    "/update/category/:id",authenticateAdmin,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_CATEGORY_ID),
    body("name")
        .optional()
        .notEmpty()
        .withMessage(Msg.CATEGORY_NAME_REQUIRED),
    controller.updateCategory
);

router.delete(
    "/delete/category/:id",authenticateAdmin,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_CATEGORY_ID),
    controller.deleteCategory
);

module.exports = router;