/* eslint-disable no-unused-vars */
const { StatusCodes } = require('http-status-codes');
const sendResponse = require('../../../shared/sendResponse');
const fileUploader = require('../../../utils/fileUploader');
const IdGenerator = require('../../../utils/idGenerator');
const CustomError = require('../../errors');
const { createVerification } = require('../varificationModule/verification.services');
const userServices = require('./user.services')

// controller for create new user
const createUser = async(req, res) => {
    const userData = req.body;

    const userId = IdGenerator.generateUserId();
    const userImagePath = await fileUploader(req.files, `user-image-${userData.userName}`, "image")

    userData.userId = userId
    userData.image = userImagePath

    const user = await userServices.createUser(userData);
    if(!user){
        throw new CustomError.BadRequestError("Failed to create new user!")
    }

    const expireDate = new Date()
    expireDate.setMinutes(expireDate.getMinutes() + 30)
    const verificationPayload = {
        userId,
        code: IdGenerator.generateCode(),
        expireDate,
        type: "email-verification",
    }
    await createVerification(verificationPayload)

    const {password, ...userInfoAcceptPass} = user.toObject();

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        status: "success",
        message: "User creation successfull",
        data: userInfoAcceptPass,
    })
}



module.exports = {
    createUser,
}