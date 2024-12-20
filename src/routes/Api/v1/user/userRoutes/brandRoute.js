"use strict";

const express = require("express")
const router = express.Router();
const controller = require("../../../../../controllers/Api/v1/user/brandController");
const Msg = require("../../../../../helpers/localization");
const { param,query } = require("express-validator");
const { authenticateUser } = require("../../../../../helpers/middleware");

router.get(
    "/list/brand",authenticateUser,
    query("search").optional().isString(),
    query("page").optional().toInt(),
    query("perPage").optional().toInt(),
    controller.listBrand
);

router.get(
    "/brand/detail/:id",authenticateUser,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_BRAND_ID),
    controller.brandDetail
);

module.exports = router;