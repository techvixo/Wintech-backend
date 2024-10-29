const { StatusCodes } = require('http-status-codes');
const sendResponse = require('../../../shared/sendResponse');
const CustomError = require('../../errors');
const messageServices = require('./message.services')

// controller for start-chat with user by email
const startChatWithUser = async(req, res) => {
    const {email} = req.params
    
    const chatUser = await messageServices.getChatUserByEmail(email);

    if(!chatUser){
        const chatUser = await messageServices.createChatUser({email});
        if(!chatUser){
            throw new CustomError.BadRequestError("Failed to start chat!")
        }
    }

    // fetch previous message if any
    const messages = await messageServices.getAllMessageByUserEmail(email);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        status: "success", 
        message: "Chat start successfull.",
        data: {
            previousMessages: messages
        }
    })
}


module.exports = {
    startChatWithUser,
}