const mongoose = require('mongoose');


const webHomeSchema = new mongoose.Schema({
    cnc_machine_part: [{
        image: String,
        title_en: String
        title_cn: String
    }],
    custom_parts_video: String,
    featured_video: {
        left_side_video: String,
        right_side_video: String,
    }
}, {
    timestamps: true
})


const WebHome = mongoose.model('webHome', webHomeSchema);
module.exports = WebHome;