"use strict";

const moment = require("moment");
const service = require("../../../../helpers/index");
const Msg = require("../../../../helpers/localization");
const { HttpStatus } = require("../../../../errors/code");
const userRepo = require("../../../../data-access/userRepo");

module.exports = {
    
    getMyProfile: async function (req,res) {
        try {
            if (service.hashValidatorErrors(req,res)) {
                return;
            }

            const userId = req.authUser.id;
            
            const userInfo = await userRepo.getDetail({ _id:userId });
            if (!userInfo) {
                return res.send(
                    service.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.USER_NOT_FOUND
                    )
                );
            }
            return res.send(
                service.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    { profile: userInfo }
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

    updateUser: async function (req,res) {
        try {
            if (service.hashValidatorErrors(req,res)) {
                return;
            }

            const userId = req.authUser.id;

            const existUser = await userRepo.getDetail({ _id:userId });
            if (!existUser) {
                return res.send(
                    service.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.USER_NOT_FOUND
                    )
                );
            }

            const userDetail = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                mobileNumber: req.body.mobileNumber,
                dateOfBirth: moment(req.body.dateOfBirth, "DD-MM-YYYY").valueOf(),
                gender: req.body.gender
            }

            if (req.body.password) {
                userDetail.password = await service.bcryptPassword(req.body.password);
            }

            const updatedUser = await userRepo.update(userId, userDetail);
            return res.send(
                service.prepareResponse(
                    HttpStatus.OK,
                    Msg.USER_PROFILE_UPDATE,
                    { id: updatedUser.id }
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

    deleteUser: async function (req,res) {
        try {
            if (service.hashValidatorErrors(req,res)) {
                return;
            }

            const userId = req.authUser.id;

            const result = await userRepo.deleteUser(userId);
            if (!result) {
                return res.send(
                    service.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.USER_NOT_FOUND
                    )
                );
            }
            return res.send(
                service.prepareResponse(
                    HttpStatus.NO_CONTENT,
                    Msg.USER_PROFILE_DELETE
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
    }
}