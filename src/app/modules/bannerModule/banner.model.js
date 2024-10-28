const mongoose = require('mongoose')


const bannerSchema = new mongoose.Schema({
    purpose: {
        type: String,
        required: true,
    },
    title_en: {
        type: String,
        required: true
    },
    title_cn: {
        type: String,
        required: true
    },
    description_en: {
        type: String,
        required: true,
    },
    description_cn: {
        type: String,
        required: true,
    },
    banner_image: String
}, {
    timestamps: true
})

const Banner = mongoose.model('banner', bannerSchema)

module.exports = Banner;