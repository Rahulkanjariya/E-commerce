"use strict";

const service = require("../../../../helpers/index");
const Msg = require("../../../../helpers/localization");
const { HttpStatus } = require("../../../../errors/code");
const reviewRepo = require("../../../../data-access/reviewRepo");

module.exports = {
    listReview : async function (req,res) {
        try {
            if (service.hashValidatorErrors(req, res)) {
                return;
            }

            const { perPage, page, skip } = service.parsePagination(req.query);
            const { list, total } = await reviewRepo.list(skip, perPage);
            const totalPages = Math.ceil(total / perPage);

            return res.send(
                service.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    {
                        review: list,
                        page: page + 1,
                        perPage: perPage,
                        totalRecords: total,
                        totalPages: totalPages,
                    }
                )
            );
            
        } catch (error) {
            return res.send(
                service.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            );
        }
    },
    
    reviewDetail : async function (req,res) {
        try {
            if (service.hashValidatorErrors(req, res)) {
                return;
            }
            
            const reviewId = req.params.id;

            const review = await reviewRepo.getDetail({ _id:reviewId });
            if (!review) {
                return res.send(
                    service.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.REVIEWS_NOT_FOUND
                    )
                );
            }
            return res.send(
                service.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    { review }
                )
            );
            
        } catch (error) {
            return res.send(
                service.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            );
        }
    },
}