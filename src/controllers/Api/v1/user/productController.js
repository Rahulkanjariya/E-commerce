"use strict";

const service = require("../../../../helpers/index");
const Msg = require("../../../../helpers/localization");
const { HttpStatus } = require("../../../../errors/code");
const productRepo = require("../../../../data-access/productRepo");

module.exports = {
    listProduct: async function (req,res) {
        try {
            if (service.hashValidatorErrors(req,res)) {
                return;
            }

            const { perPage, page, skip } = service.parsePagination(req.query);
            let query = {};
            let sort = {};

            if (req.query.search) {
                query.name = { $regex: req.query.search, $options: 'i' };
            }

            if (req.query.sortBy) {
                sort[req.query.sortBy] = req.query.sortOrder === 'desc' ? -1 : 1;
            }

            const { list, total } = await productRepo.list(query, skip, perPage, sort);
            const totalPages = Math.ceil(total / perPage);

            return res.send(
                service.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    {
                        product: list,
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

    productDetail : async function (req,res) {
        try {
            if (service.hashValidatorErrors(req,res)) {
                return;
            }

            const productId = req.params.id;

            const productInfo = await productRepo.getDetail({ _id:productId });
            if (!productInfo) {
                return res.send(
                    service.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.PRODUCT_NOT_FOUND
                    )
                );
            }
            return res.send(
                service.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    { productInfo }
                )
            );

        } catch (error){
            return res.send(
                service.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            );
        }
    },
}