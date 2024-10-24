const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
  {
   categoryId: {
    type: String,
    unique: true,
    trim: true,
    required: true
   },
   name: {
    type: String,
    required: true,
   },
   description: String,
   status: {
    type: String,
    enum: ['active', "disable"],
    default: "active"
   },
   image: String,
   products: [
    {
        productId: String,
        title: String,
        subTitle: String,
    }
   ]
  },
  {
    timestamps: true
  }
)

const Category = mongoose.model('category', categorySchema)

module.exports = Category
