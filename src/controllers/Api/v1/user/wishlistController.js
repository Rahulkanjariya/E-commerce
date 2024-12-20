"use strict";

const service = require("../../../../helpers/index");
const Msg = require("../../../../helpers/localization");
const { HttpStatus } = require("../../../../errors/code");
const wishlistRepo = require("../../../../data-access/wishlistRepo");

module.exports = {
    addToWishList : async function (req,res) {
        try {
            if (service.hashValidatorErrors(req, res)) {
                return;
            }

            const wishlistDetail = {
                userId: req.body.userId,
                productId: req.body.productId,
            };

            const newWishlist = await wishlistRepo.create(wishlistDetail);
            return res.send(
                service.prepareResponse(
                    HttpStatus.CREATED,
                    Msg.ITEM_ADDED_TO_WISHLIST,
                    { id: newWishlist.id }
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
    
    listWishlist : async function (req,res) {
        try {
            if (service.hashValidatorErrors(req, res)) {
                return;
            }
            const { perPage, page, skip } = service.parsePagination(req.query);
            const { list, total } = await wishlistRepo.list(skip, perPage);
            const totalPages = Math.ceil(total / perPage);
            
            return res.send(
                service.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    {
                        wishList: list,
                        page: page + 1,
                        perPage: perPage,
                        totalRecords: total,
                        totalPages: totalPages

                    }
                )
            )

        } catch (error){
            return res.send(
                service.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            );
        }
    },
    
    removeWishlist: async function (req, res) {
        try {
            if (service.hashValidatorErrors(req, res)) {
                return;
            }

            const wishistId = req.params.id;

            const wishlistInfo = await wishlistRepo.removeWishlist(wishistId);
            if (!wishlistInfo) {
                return res.send(
                    service.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.WISHLIST_NOT_FOUND
                    )
                );
            }
            return res.send(
                service.prepareResponse(
                    HttpStatus.NO_CONTENT,
                    Msg.ITEM_REMOVED_FROM_WISHLIST
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
