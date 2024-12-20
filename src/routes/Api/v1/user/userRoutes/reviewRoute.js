"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../../../../../controllers/Api/v1/user/reviewController");
const Msg = require("../../../../../helpers/localization");
const { body,param,query } = require("express-validator");
const { authenticateUser } = require("../../../../../helpers/middleware");

router.post(
    "/add/review",authenticateUser,
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
    body("rating")
        .notEmpty()
        .withMessage(Msg.RATING_REQUIRED)
        .isInt({ min: 1, max: 5 })
        .withMessage(Msg.INVALID_RATING),
    body("comment")
        .notEmpty()
        .withMessage(Msg.COMMENT_REQUIRED)
        .isLength({ max: 500 })
        .withMessage(Msg.INVALID_COMMENT_LENGTH),
    controller.addReview
);

router.get(
    "/list/review",authenticateUser,
    query("page").optional().toInt(),
    query("perPage").optional().toInt(),
    controller.listReview
);

router.get(
    "/review/detail/:id",authenticateUser,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_REVIEW_ID),
    controller.reviewDetail
);

router.put(
    "/update/review/:id",authenticateUser,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_REVIEW_ID),
    body("rating")
        .optional()
        .notEmpty()
        .withMessage(Msg.RATING_REQUIRED)
        .isInt({ min: 1, max: 5 })
        .withMessage(Msg.INVALID_RATING),
    body("comment")
        .optional()
        .notEmpty()
        .withMessage(Msg.COMMENT_REQUIRED)
        .isLength({ max: 500 })
        .withMessage(Msg.INVALID_COMMENT_LENGTH),
    controller.updateReview
);

router.delete(
    "/delete/review/:id",authenticateUser,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_REVIEW_ID),
    controller.deleteReview
);

module.exports = router;
