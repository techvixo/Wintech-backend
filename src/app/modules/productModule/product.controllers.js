const productServices = require('./product.services');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const sendResponse = require('../../../shared/sendResponse');
const fileUploader = require('../../../utils/fileUploader');
const IdGenerator = require('../../../utils/idGenerator');

// Controller for creating a new product
const createProduct = async (req, res) => {
  const productData = req.body;
  const productId = IdGenerator.generateId();
  
  productData.productId = productId;

  // Upload images if any
  const productImages = await fileUploader(req.files, `product-images-${productData.title}`, "images");
  productData.images = productImages;

  const product = await productServices.createProduct(productData);
  if (!product) {
    throw new CustomError.BadRequestError('Failed to create new product!');
  }

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    status: 'success',
    message: 'Product creation successful',
    data: product,
  });
};

// Controller for getting all products
const getAllProducts = async (req, res) => {
  const products = await productServices.getAllProducts();
  if (products.length === 0) {
    throw new CustomError.NotFoundError('No products found!');
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Products retrieved successfully',
    data: products,
  });
};

// Controller for getting a specific product by ID
const getSpecificProduct = async (req, res) => {
  const { id } = req.params;

  const product = await productServices.getSpecificProduct(id);
  if (!product) {
    throw new CustomError.NotFoundError('Product not found!');
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Product retrieved successfully',
    data: product,
  });
};

// Controller for updating a specific product
const updateSpecificProduct = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  // If there are new images to upload
  if (req.files && req.files.length > 0) {
    const productImages = await fileUploader(req.files, `product-images-${updateData.title}`, "images");
    updateData.images = productImages;
  }

  const product = await productServices.updateSpecificProduct(id, updateData);
  if (!product.modifiedCount) {
    throw new CustomError.NotFoundError('Product update failed!');
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Product updated successfully',
  });
};

// Controller for deleting a specific product
const deleteSpecificProduct = async (req, res) => {
  const { id } = req.params;

  const result = await productServices.deleteSpecificProduct(id);
  if (!result.deletedCount) {
    throw new CustomError.NotFoundError('Product deletion failed!');
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Product deleted successfully',
  });
};

module.exports = {
  createProduct,
  getAllProducts,
  getSpecificProduct,
  updateSpecificProduct,
  deleteSpecificProduct,
};
