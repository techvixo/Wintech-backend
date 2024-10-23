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
        code: IdGenerator.generateCode().toString(),
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

// controller for get specific user
const getSpecificUser = async(req, res) => {
    const {id} = req.params
    const user = await userServices.getSpecificUser(id);
    if(!user){
        throw new CustomError.BadRequestError("No user found!")
    }

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        status: "success",
        message: "User found successfull",
        data: user
    })
}

// controller for delete specific user
const deleteSpecificUser = async(req, res) => {
    const {id} = req.params
    const user = await userServices.deleteSpecificUser(id);
    if(!user.deletedCount){
        throw new CustomError.BadRequestError("Failed to delete user!")
    }

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        status: "success",
        message: "User delete successfull",
    })
}

// controller for update specific user
const updateSpecificUser = async(req, res) => {
    const {id} = req.params
    const data = req.body
    if(data.userId || data.email || data.password){
        throw new CustomError.BadRequestError("You can't update usesrId, email and password directly!")
    }
    const updatedUser = await userServices.updateSpecificUser(id, data);
    if(!updatedUser.modifiedCount){
        throw new CustomError.BadRequestError("Failed to update user!")
    }

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        status: "success",
        message: "User update successfull",
    })
}

// controller for change profile image of specific user
const changeUserProfileImage = async(req, res) => {
    const {id} = req.params
    const files = req.files

    const user = await userServices.getSpecificUser(id);

    const userImagePath = await fileUploader(files, `user-image-${user.userName}`, "image");
    const updateUser = await userServices.updateSpecificUser(id, {image: userImagePath})

    if(!updateUser.modifiedCount){
        throw new CustomError.BadRequestError("Failed to change user profile image!")
    }

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        status: "success",
        message: "User profile change successfull",
    })
}





module.exports = {
    createUser,
    getSpecificUser,
    deleteSpecificUser,
    updateSpecificUser,
    changeUserProfileImage,
}