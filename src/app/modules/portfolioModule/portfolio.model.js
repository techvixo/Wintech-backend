const mongoose = require('mongoose')

const portfolioSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
    },
    description: String,
    image: String,
    url: String,
    status: {
        type: String,
        enum: ["active", "disable"],
        default: 'active',
    },
    addedBy: {
        adminId: String,
        name: String,
        email: String,
    }
  },
  {
    timestamps: true
  }
)

const Portfolio = mongoose.model('portfolio', portfolioSchema)

module.exports = Portfolio
