"use strict";

const service = require("../../../../helpers/index");
const Msg = require("../../../../helpers/localization");
const { HttpStatus } = require("../../../../errors/code");
const categoryRepo = require("../../../../data-access/categoryRepo");

module.exports = {
    addCategory: async function (req,res) {
        try {
            if (service.hashValidatorErrors(req,res)) {
                return;
            }

            const categoryExist = await categoryRepo.getDetail({ name:req.body.name });
            if (categoryExist) {
                return res.send(
                    service.prepareResponse(
                        HttpStatus.BAD_REQUEST,
                        Msg.CATEGORY_EXISTS
                    )
                )
            }

            const categoryDetail = {
                name: req.body.name
            }

            const newCategory = await categoryRepo.create(categoryDetail);
            return res.send(
                service.prepareResponse(
                    HttpStatus.CREATED,
                    Msg.CATEGORY_CREATED,
                    { id:newCategory.id }
                )
            )

        } catch (error) {
            return res.send(
                service.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            );
        }
    },

    listCategory : async function (req,res) {
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

            const { list, total } = await categoryRepo.list(query, skip, perPage, sort);
            const totalPages = Math.ceil(total / perPage);

            return res.send(
                service.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    {
                        category: list,
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

    categoryDetail: async function (req,res) {
        try {
            if (service.hashValidatorErrors(req,res)) {
                return;
            }

            const categoryId = req.params.id;

            const categoryInfo = await categoryRepo.getDetail({ _id:categoryId });
            if (!categoryInfo) {
                return res.send(
                    service.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.CATEGORY_NOT_FOUND
                    )
                );
            }
            return res.send(
                service.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    { categoryInfo }
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

    updateCategory: async function (req,res) {
        try {
            if (service.hashValidatorErrors(req,res)) {
                return;
            }

            const categoryId = req.params.id;

            const category = await categoryRepo.getDetail({ _id:categoryId });
            if (!category) {
                return res.send(
                    service.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.CATEGORY_NOT_FOUND
                    )
                );
            }

            const categoryDetail = {
                name: req.body.name
            }

            const updatedCategory = await categoryRepo.update(categoryId,categoryDetail);
            return res.send(
                service.prepareResponse(
                    HttpStatus.OK,
                    Msg.CATEGORY_UPDATED,
                    { id:updatedCategory.id }
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

    deleteCategory: async function (req,res) {
        try {
            if (service.hashValidatorErrors(req,res)) {
                return;
            }

            const categoryId = req.params.id;

            const deleteCategory = await categoryRepo.deleteCategory(categoryId);
            if (!deleteCategory) {
                return res.send(
                    service.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.CATEGORY_NOT_FOUND
                    )
                );
            }
            return res.send(
                service.prepareResponse(
                    HttpStatus.NO_CONTENT,
                    Msg.CATEGORY_DELETED
                )
            )

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