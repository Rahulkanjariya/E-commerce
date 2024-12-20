"use strict";

const express = require("express")
const router = express.Router();
const controller = require("../../../../../controllers/Api/v1/admin/brandController");
const Msg = require("../../../../../helpers/localization");
const { body,param,query } = require("express-validator");
const { authenticateAdmin } = require("../../../../../helpers/middleware");

router.post(
    "/add/brand",authenticateAdmin,
    body("name")
        .notEmpty()
        .withMessage(Msg.BRAND_NAME_REQUIRED),
    controller.addBrand
);

router.get(
    "/list/brand",authenticateAdmin,
    query("search").optional().isString(),
    query("page").optional().toInt(),
    query("perPage").optional().toInt(),
    controller.listBrand
);

router.get(
    "/brand/detail/:id",authenticateAdmin,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_BRAND_ID),
    controller.brandDetail
);

router.put(
    "/update/brand/:id",authenticateAdmin,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_BRAND_ID),
    body("name")
        .optional()
        .notEmpty()
        .withMessage(Msg.BRAND_NAME_REQUIRED),
    controller.updateBrand
);

router.delete(
    "/delete/brand/:id",authenticateAdmin,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_BRAND_ID),
    controller.deleteBrand
);

module.exports = router;