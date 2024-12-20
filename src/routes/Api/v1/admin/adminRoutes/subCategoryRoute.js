"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../../../../../controllers/Api/v1/admin/subCategoryController");
const Msg = require("../../../../../helpers/localization");
const { body,param,query } = require("express-validator");
const { authenticateAdmin } = require("../../../../../helpers/middleware");

router.post(
    "/add/subcategory",authenticateAdmin,
    body("name")
        .notEmpty()
        .withMessage(Msg.SUB_CATEGORY_NAME_REQUIRED),
    body("categoryId")
        .notEmpty()
        .withMessage(Msg.CATEGORY_ID_REQUIRED)
        .isMongoId()
        .withMessage(Msg.INVALID_CATEGORY_ID),
    controller.addSubCategory
);

router.get(
    "/list/subcategory",authenticateAdmin,
    query("search").optional().isString(),
    query("page").optional().toInt(),
    query("perPage").optional().toInt(),
    controller.listSubCategory
);

router.get(
    "/subcategory/detail/:id",authenticateAdmin,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_SUB_CATEGORY_ID),
    controller.subCategoryDetail
);

router.put(
    "/update/subcategory/:id",authenticateAdmin,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_SUB_CATEGORY_ID),
    body("name")
        .optional()
        .notEmpty()
        .withMessage(Msg.SUB_CATEGORY_NAME_REQUIRED),
    controller.updateSubCategory
);

router.delete(
    "/delete/subcategory/:id",authenticateAdmin,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_SUB_CATEGORY_ID),
    controller.deleteSubCategory
);


module.exports = router;