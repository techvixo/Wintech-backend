const Verification = require("./varification.model")

// service for create new verification
const createVerification = async(data) => {
    return await Verification.create(data);
}


module.exports = {
    createVerification,
}