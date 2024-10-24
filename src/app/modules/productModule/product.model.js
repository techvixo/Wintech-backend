const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    productId: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    subTitle: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "disable"],
        default: "active",
    },
    images: [String],
    configurations: {
        default: null
    },
    category: {
        categoryId: String,
        title: String,
    },
    createdBy: {
        adminId: String,
        name: String,
        email: String
    }
  },
  {
    timestamps: true
  }
)

const Product = mongoose.model('product', productSchema)

module.exports = Product
