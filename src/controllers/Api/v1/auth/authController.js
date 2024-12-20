"use strict";

const bcrypt = require("bcryptjs");
const moment = require("moment");
const service = require("../../../../helpers/index");
const Msg = require("../../../../helpers/localization");
const { HttpStatus } = require("../../../../errors/code");
const userRepo = require("../../../../data-access/userRepo");
const { sendEmail } = require("../../../../helpers/email");

module.exports = {

    signUp: async function (req,res) {
        try {
            if (service.hashValidatorErrors(req,res)) {
                return;
            }

            const emailExist = await userRepo.getDetail({ email: req.body.email });
            if (emailExist) {
                return res.send(
                    service.prepareResponse(
                        HttpStatus.BAD_REQUEST,
                        Msg.EMAIL_EXIST
                    )
                );
            }

            const userDetail = {
                type: req.body.type,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: await service.bcryptPassword(req.body.password),
                mobileNumber: req.body.mobileNumber,
                dateOfBirth: moment(req.body.dateOfBirth, "DD-MM-YYYY").valueOf(),
                gender: req.body.gender,
            };

            const newUser = await userRepo.create(userDetail);
            return res.send(
                service.prepareResponse(
                    HttpStatus.CREATED,
                    Msg.USER_REGISTER,
                    { id:newUser.id }
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

    login: async function (req,res) {
        try {
            if (service.hashValidatorErrors(req,res)) {
                return;
            }

            const userLogin = await userRepo.getDetail({ email: req.body.email });
            if (!userLogin) {
                return res.send(
                    service.prepareResponse(
                        HttpStatus.BAD_REQUEST,
                        Msg.INVALID_EMAIL
                    )
                )
            }

            const passwordMatch = await bcrypt.compare(req.body.password, userLogin.password);
            if (!passwordMatch) {
                return res.send(
                    service.prepareResponse(
                        HttpStatus.UNAUTHORIZED,
                        Msg.INVALID_PASSWORD
                    )
                )
            }

            const token = service.generateToken(userLogin);
            return res.send(
                service.prepareResponse(
                    HttpStatus.OK,
                    Msg.USER_LOGIN,
                    { token:token }
                )
            )

        } catch (error) {
            return res.send(
                service.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            )
        }
    },

    updatePassword: async function (req,res) {
        try {
            if (service.hashValidatorErrors(req,res)) {
                return;
            }

            const userId = req.authUser.id;
            const { currentPassword, newPassword } = req.body;
            const user = await userRepo.getDetail({ _id:userId });

            if (!user) {
                return res.send(
                    service.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.USER_NOT_FOUND
                    )
                );
            }

            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.send(
                    service.prepareResponse(
                        HttpStatus.UNAUTHORIZED,
                        Msg.PASSWORD_NOT_MATCH
                    )
                );
            }

            const hashedNewPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedNewPassword;
            await user.save();

            return res.send(
                service.prepareResponse(
                    HttpStatus.OK,
                    Msg.PASSWORD_UPDATE
                )
            )

        } catch (error) {
            return res.send(
                service.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            )

        }
    },

    forgotPassword: async function (req,res) {
        try {
            if (service.hashValidatorErrors(req,res)) {
                return;
            }

            const user = await userRepo.getDetail({ email: req.body.email });
            if (!user) {
                return res.send(
                    service.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.USER_NOT_FOUND
                    )
                );
            }

            const newPassword = await service.generatePassword();
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            await user.save();

            const emailSent = await sendEmail(
                user.email,
                'Password Reset',
                `Your new password is ${newPassword}.`
            );

            if (!emailSent) {
                return res.send(
                    service.prepareResponse(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        Msg.SERVER_ERROR
                    )
                );
            }

            return res.send(
                service.prepareResponse(
                    HttpStatus.OK,
                    Msg.PASSWORD_RESET_SUCCESS
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