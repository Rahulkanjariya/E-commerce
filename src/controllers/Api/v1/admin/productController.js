"use strict";

const service = require("../../../../helpers/index");
const Msg = require("../../../../helpers/localization");
const { HttpStatus } = require("../../../../errors/code");
const productRepo = require("../../../../data-access/productRepo");
const imageMimeType = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];

module.exports = {

    addProduct : async function (req,res) {
        try {
            if (service.hashValidatorErrors(req,res)) {
                return;
            }

            const productExist = await productRepo.getDetail({ name: req.body.name });
            if (productExist) {
                return res.send(
                    service.prepareResponse(
                        HttpStatus.BAD_REQUEST,
                        Msg.PRODUCT_EXISTS
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

            const productImage = await service.imageUpload(req.files.image, "product-image")
            const productDetail = {
                name: req.body.name,
                categoryId: req.body.categoryId,
                subCategoryId: req.body.subCategoryId,
                brandId: req.body.brandId,
                price: req.body.price,
                description: req.body.description,
                image: productImage,
                size: req.body.size,
                color: req.body.color,
                stock: req.body.stock,
            };
            
            const newProduct = await productRepo.create(productDetail);
            return res.send(
                service.prepareResponse(
                    HttpStatus.CREATED,
                    Msg.PRODUCT_CREATED,
                    { id: newProduct.id }
                )
            );

        } catch(error) {
            return res.send(
                service.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            );
        }
    },

    listProduct: async function (req,res) {
        try {
            if (service.hashValidatorErrors(req,res)) {
                return;
            }

            const { perPage, page, skip } = service.parsePagination(req.query);
            let query = {};
            let sort = {};

            if (req.query.search) {
                query.$or = [
                    { name: { $regex: req.query.search, $options: 'i' } },
                ];
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

        }  catch (error) {
            return res.send(
                service.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            );
        }
    },

    productDetail: async function (req,res) {
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

        } catch (error) {
            return res.send(
                service.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            )
        }
    },

    updateProduct: async function (req,res) {
        try {
            if (service.hashValidatorErrors(req,res)) {
                return;
            }
    
            const productId = req.params.id;

            const existProduct = await productRepo.getDetail({ _id:productId });
            if (!existProduct) {
                return res.send(
                    service.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.PRODUCT_NOT_FOUND
                    )
                );
            }
    
            let productImage = existProduct.image;
            if (req.files && req.files.image) {
                if (!imageMimeType.includes(req.files.image.mimetype)) {
                    return res.send(
                        service.prepareResponse(
                            HttpStatus.BAD_REQUEST,
                            Msg.INVALID_IMAGE_TYPE
                        )
                    );
                }
                if (productImage) await service.deleteImage(productImage);
                productImage = await service.imageUpload(req.files.image, 'product-image');
            }
    
            const productDetail = {
                name: req.body.name,
                categoryId: req.body.categoryId,
                subCategoryId: req.body.subCategoryId,
                brandId: req.body.brandId,
                price: req.body.price,
                description: req.body.description,
                image: productImage,
                size: req.body.size,
                color: req.body.color,
                stock: req.body.stock,
            };
    
            const updatedProduct = await productRepo.update(productId, productDetail);
            return res.send(
                service.prepareResponse(
                    HttpStatus.OK,
                    Msg.PRODUCT_UPDATED,
                    { id: updatedProduct.id }
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

    deleteProduct: async function (req,res) {
        try {
            if (service.hashValidatorErrors(req,res)) {
                return;
            }

            const productId = req.params.id;

            const deleteProduct = await productRepo.deleteProduct(productId);
            if (!deleteProduct) {
                return res.send(
                    service.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.PRODUCT_NOT_FOUND
                    )
                );
            }
            return res.send(
                service.prepareResponse(
                    HttpStatus.NO_CONTENT,
                    Msg.PRODUCT_DELETED,
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