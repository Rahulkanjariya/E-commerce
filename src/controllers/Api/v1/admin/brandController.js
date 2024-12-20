"use strict";

const service = require("../../../../helpers/index");
const Msg = require("../../../../helpers/localization");
const { HttpStatus } = require("../../../../errors/code");
const brandRepo = require("../../../../data-access/brandRepo");
const imageMimeType = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];

module.exports = {
    addBrand : async function (req,res) {
        try {
            if (service.hashValidatorErrors(req,res)) {
                return;
            }

            const brandExist = await brandRepo.getDetail({ name: req.body.name });
            if (brandExist) {
                return res.send(
                    service.prepareResponse(
                        HttpStatus.BAD_REQUEST,
                        Msg.BRAND_EXISTS
                    )
                );
            }

            if (!req.files || !req.files?.image) {
                return res.send(
                    service.prepareResponse(
                        HttpStatus.BAD_REQUEST,
                        Msg.IMAGE_IS_REQUIRED
                    )
                )
            }

            if (!imageMimeType.includes(req.files.image.mimetype)) {
                return res.send(
                    service.prepareResponse(
                        HttpStatus.BAD_REQUEST,
                        Msg.INVALID_IMAGE_TYPE
                    )
                )
            }

            const brandImage = await service.imageUpload(req.files.image, "brand-logo")
            const brandDetail = {
                name:req.body.name,
                image: brandImage
            };

            const newBrand = await brandRepo.create(brandDetail);
            return res.send(
                service.prepareResponse(
                    HttpStatus.CREATED,
                    Msg.BRAND_CREATED,
                    { id: newBrand.id }
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

    listBrand : async function (req,res) {
        try {
            if (service.hashValidatorErrors(req,res)) {
                return;
            }

            const { perPage, page, skip } = service.parsePagination(req.query);
            let query = {};
            let sort = {};

            if (req.query.search) {
                console.log(req.query.search )
                query.$or = [
                    { name: { $regex: req.query.search, $options: 'i' } },
                ];
            }
            
            if (req.query.sortBy) {
                sort[req.query.sortBy] = req.query.sortOrder === 'desc' ? -1 : 1;
            }

            const { list, total } = await brandRepo.list(query, skip, perPage, sort);
            const totalPages = Math.ceil(total / perPage);

            return res.send(
                service.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    {
                        brand: list,
                        page: page + 1,
                        perPage: perPage,
                        totalRecords: total,
                        totalPages: totalPages,
                    }
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

    brandDetail : async function (req,res) {
        try {
            if (service.hashValidatorErrors(req,res)) {
                return;
            }

            const brandId = req.params.id;
            const brandInfo = await brandRepo.getDetail({ _id:brandId });

            if (!brandInfo) {
                return res.send(
                    service.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.BRAND_NOT_FOUND
                    )
                );
            }
            return res.send(
                service.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    { brandInfo }
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

    updateBrand: async function (req,res) {
        try {
            if (service.hashValidatorErrors(req,res)) {
                return;
            }
    
            const brandId = req.params.id;

            const existBrand = await brandRepo.getDetail({ _id: brandId });
            if (!existBrand) {
                return res.send(
                    service.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.BRAND_NOT_FOUND
                    )
                );
            }
    
            let imagePath = existBrand.image;
            if (req.files && req.files.image) {
                if (!imageMimeType.includes(req.files.image.mimetype)) {
                    return res.send(
                        service.prepareResponse(
                            HttpStatus.BAD_REQUEST,
                            Msg.INVALID_IMAGE_TYPE
                        )
                    );
                }
                if (imagePath) await service.deleteImage(imagePath);
                imagePath = await service.imageUpload(req.files.image, 'brand-logo');
            }
    
            const brandDetail = {
                name: req.body.name,
                image: imagePath
            };
    
            const updatedBrand = await brandRepo.update(brandId, brandDetail);
            return res.send(
                service.prepareResponse(
                    HttpStatus.OK,
                    Msg.BRAND_UPDATED,
                    { id: updatedBrand.id }
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

    deleteBrand: async function (req,res) {
        try {
            if (service.hashValidatorErrors(req,res)) {
                return;
            }

            const brandId = req.params.id;

            const deleteBrand = await brandRepo.deleteBrand(brandId);
            if (!deleteBrand) {
                return res.send(
                    service.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.BRAND_NOT_FOUND
                    )
                );
            }
            return res.send(
                service.prepareResponse(
                    HttpStatus.NO_CONTENT,
                    Msg.BRAND_DELETED
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
    }

}