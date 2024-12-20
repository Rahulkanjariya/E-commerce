"use strict";

const service = require("../../../../helpers/index");
const Msg = require("../../../../helpers/localization");
const { HttpStatus } = require("../../../../errors/code");
const productRepo = require("../../../../data-access/productRepo");
const imageMimeType = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];

module.exports = {

    addProduct : async function (req,res) {
        try {
            if (service.hashValidatorErrors(req, res)) {
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
}