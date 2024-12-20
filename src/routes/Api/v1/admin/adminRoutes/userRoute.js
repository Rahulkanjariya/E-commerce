"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../../../../../controllers/Api/v1/admin/userController");
const Msg = require("../../../../../helpers/localization");
const { param,query } = require("express-validator");
const { authenticateAdmin } = require("../../../../../helpers/middleware");

router.get(
    "/list/user",authenticateAdmin,
    query("search").optional().isString(),
    query("page").optional().isInt(),
    query("perPage").optional().isInt(),
    controller.listUser
);

router.get(
    "/user/detail/:id",authenticateAdmin,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_USER_ID),
    controller.userDetail
);

router.delete(
    "/delete/user/:id",authenticateAdmin,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_USER_ID),
    controller.deleteUser
);


module.exports = router;