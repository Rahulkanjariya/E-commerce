const service = require("../../../../helpers/index");
const Msg = require("../../../../helpers/localization");
const { HttpStatus } = require("../../../../errors/code");
const addressRepo = require("../../../../data-access/addressRepo");

module.exports = {
    addAddress: async function (req,res) {
        try {
            if (service.hashValidatorErrors(req,res)) {
                return;
            }

            const addressDetail = {
                userId: req.authUser.id,
                apartmentName: req.body.apartmentName,
                streetNo: req.body.streetNo,
                city: req.body.city,
                state: req.body.state,
                zipCode: req.body.zipCode,
                country: req.body.country
            }

            const newAddress = await addressRepo.create(addressDetail);
            return res.send(
                service.prepareResponse(
                    HttpStatus.CREATED,
                    Msg.USER_ADDRESS_CREATED,
                    { id: newAddress.id }
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

    listAddress : async function (req,res) {
        try {
            if (service.hashValidatorErrors(req, res)) {
                return;
            }

            const userId = req.authUser._id;
            const { perPage, page, skip } = service.parsePagination(req.query);
            let query = { userId: userId };

            if (req.query.search) {
                query.$or = [
                    { city: { $regex: req.query.search, $options: 'i' } },
                    { state: { $regex: req.query.search, $options: 'i' } },
                ];
            }

            const { list, total } = await addressRepo.list(query, skip, perPage);
            const totalPages = Math.ceil(total / perPage);

            return res.send(
                service.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    {
                        address: list,
                        page: page + 1,
                        perPage: perPage,
                        totalRecords: total,
                        totalPages: totalPages
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

    addressDetail: async function (req,res) {
        try {
            if (service.hashValidatorErrors(req,res)) {
                return;
            }

            const addressId = req.params.id;

            const address = await addressRepo.getDetail({ _id:addressId });
            if (!address) {
                return res.send(
                    service.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.USER_ADDRESS_NOT_FOUND
                    )
                );
            }
            return res.send(
                service.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    { address }
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

    updateAddress : async function (req,res) {
        try {
            if (service.hashValidatorErrors(req, res)) {
                return;
            }
            
            const addressId = req.params.id;

            const existAddress = await addressRepo.getDetail({ _id:addressId });
            if (!existAddress) {
                return res.send(
                    service.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.USER_ADDRESS_NOT_FOUND
                    )
                );
            }
            
            const addressDetail = {
                userId: req.body.userId,
                apartmentName: req.body.apartmentName,
                streetNo: req.body.streetNo,
                city: req.body.city,
                state: req.body.state,
                zipCode: req.body.zipCode,
                country: req.body.country,
            };

            const updatedAddress = await addressRepo.update(addressId,addressDetail);
            return res.send(
                service.prepareResponse(
                    HttpStatus.OK,
                    Msg.USER_ADDRESS_UPDATED,
                    { id: updatedAddress.id }
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

    deleteAddress: async function (req,res) {
        try {
            if (service.hashValidatorErrors(req,res)) {
                return;
            }

            const addressId = req.params.id;
            
            const addressInfo = await addressRepo.deleteAddress(addressId);
            if (!addressInfo) {
                return res.send(
                    service.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.USER_ADDRESS_NOT_FOUND
                    )
                );
            }
            return res.send(
                service.prepareResponse(
                    HttpStatus.NO_CONTENT,
                    Msg.USER_ADDRESS_DELETED
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