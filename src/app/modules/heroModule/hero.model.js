const mongoose = require('mongoose')

const heroSchema = new mongoose.Schema(
  {
    title_en: String,
    title_cn: String,
    subTitle_en: String,
    subTitle_cn: String,
    images: [String]
  },
  {
    timestamps: true
  }
)

const Hero = mongoose.model('hero', heroSchema)
module.exports = Hero
