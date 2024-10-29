const ChatUser = require("./chatUser.model")
const Message = require("./message.model")

// service for get all message by userEmail
const getAllMessageByUserEmail = async(userEmail) => {
    return await Message.find({userEmail})
}

// service for create new chatUser
const createChatUser = async(data) => {
    return await ChatUser.create(data)
}

// service for get chatUser by email
const getChatUserByEmail = async(email) => {
    return await ChatUser.findOne({email})
}

module.exports = {
    getAllMessageByUserEmail,
    createChatUser,
    getChatUserByEmail
}