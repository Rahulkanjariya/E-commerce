"use strict";

const service = require("../../../../helpers/index");
const Msg = require("../../../../helpers/localization");
const { HttpStatus } = require("../../../../errors/code");
const subCategoryRepo = require("../../../../data-access/subCategoryRepo");

module.exports = {
    addSubCategory : async function (req,res){
        try {
            if (service.hashValidatorErrors(req, res)) {
                return;
            }

            const subCategoryExist = await subCategoryRepo.getDetail({ name: req.body.name });
            if (subCategoryExist) {
                return res.send(
                    service.prepareResponse(
                        HttpStatus.BAD_REQUEST,
                        Msg.SUB_CATEGORY_EXISTS
                    )
                );
            }
            
            const subCategoryDetail = {
                name: req.body.name,
                categoryId: req.body.categoryId
            };

            const newSubCategory = await subCategoryRepo.create(subCategoryDetail);
            return res.send(
                service.prepareResponse(
                    HttpStatus.CREATED,
                    Msg.SUB_CATEGORY_CREATED,
                    { id: newSubCategory.id }
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

    listSubCategory : async function (req,res) {
        try {
            if (service.hashValidatorErrors(req, res)) {
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

            const { list, total } = await subCategoryRepo.list(query, skip, perPage, sort);
            const totalPages = Math.ceil(total / perPage);

            return res.send(
                service.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    {
                        subCategory: list,
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

    subCategoryDetail: async function (req,res) {
        try {
            if (service.hashValidatorErrors(req,res)) {
                return;
            }

            const subCategoryId = req.params.id;

            const subCategoryInfo = await subCategoryRepo.getDetail({ _id:subCategoryId });
            if (!subCategoryInfo) {
                return res.send(
                    service.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.SUB_CATEGORY_NOT_FOUND
                    )
                );
            }

            return res.send(
                service.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    { subCategoryInfo }
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

    updateSubCategory: async function (req,res) {
        try {
            if (service.hashValidatorErrors(req,res)) {
                return;
            }

            const subCategoryId = req.params.id;

            const subCategory = await subCategoryRepo.getDetail({ _id:subCategoryId });
            if (!subCategory) {
                return res.send(
                    service.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.SUB_CATEGORY_NOT_FOUND
                    )
                );
            }

            const subCategoryDetail = {
                name: req.body.name,
                categoryId: req.body.categoryId
            }

            const updatedSubCategory = await subCategoryRepo.update(subCategoryId,subCategoryDetail);
            return res.send(
                service.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUB_CATEGORY_UPDATED,
                    { id:updatedSubCategory.id }
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

    deleteSubCategory: async function (req,res) {
        try {
            if (service.hashValidatorErrors(req,res)) {
                return;
            }

            const subCategoryId = req.params.id;

            const deleteSubCategory = await subCategoryRepo.deleteSubCategory(subCategoryId);
            if (!deleteSubCategory) {
                return res.send(
                    service.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.SUB_CATEGORY_NOT_FOUND
                    )
                );
            }
            return res.send(
                service.prepareResponse(
                    HttpStatus.NO_CONTENT,
                    Msg.SUB_CATEGORY_DELETED
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