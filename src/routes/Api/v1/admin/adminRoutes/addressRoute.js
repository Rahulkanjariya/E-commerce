"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../../../../../controllers/Api/v1/admin/addressController");
const Msg = require("../../../../../helpers/localization");
const { param,query } = require("express-validator");
const { authenticateAdmin } = require("../../../../../helpers/middleware");

router.get(
    "/list/address",authenticateAdmin,
    query("search").optional().isString(),
    query("page").optional().isInt(),
    query("perPage").optional().isInt(),
    controller.listAddress
);

router.get(
    "/address/detail/:id",authenticateAdmin,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_ADDRESS_ID),
    controller.addressDetail
);

module.exports = router;