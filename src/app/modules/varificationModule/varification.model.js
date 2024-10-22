const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const verificationSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
        unique: true,
    },
    code: {
        type: Number,
        required: true,
        unique: true,
    },
    expireDate: Date,
    type: {
        type: String,
        enum: ["email-verification", "forget-password"]
    },
    status: {
        type: String,
        enum: ['done', 'lose']
    },
}, {
    timestamps: true
})


verificationSchema.pre('save', function (next) {
    if(!this.isModified('code')){
        return next()
    }
    if (this.isModified('code')) {
        const saltRounds = 10
        this.password = bcrypt.hashSync(toString(this.code), saltRounds)
    }
    
    next()
})

verificationSchema.methods.compareCode = function (userPlaneCode) {
    const isMatch = bcrypt.compareSync(userPlaneCode, toString(this.code))
    return isMatch
}

const Verification = mongoose.model("verification", verificationSchema)

module.exports = Verification