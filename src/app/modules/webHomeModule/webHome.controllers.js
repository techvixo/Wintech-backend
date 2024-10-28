const webHomeServices = require('./webHome.services');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const sendResponse = require('../../../shared/sendResponse');
const fileUploader = require('../../../utils/fileUploader');

// Controller to initialize WebHome
const initializeWebHome = async (req, res) => {
    const webHome = await webHomeServices.initializeWebHome();
    
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      status: 'success',
      message: 'WebHome initialized successfully',
      data: webHome,
    });
  };

// Controller to get WebHome data
const getWebHome = async (req, res) => {
  const webHome = await webHomeServices.getWebHome();
  if (!webHome) {
    throw new CustomError.NotFoundError('WebHome not found!');
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    data: webHome,
  });
};

// Controller to update Featured Video
const updateFeaturedVideo = async (req, res) => {
  const videoData = req.body.featuredVideoUrl;
  const updatedWebHome = await webHomeServices.updateFeaturedVideo(videoData);

  if (!updatedWebHome) {
    throw new CustomError.BadRequestError('Failed to update Featured Video!');
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Featured Video updated successfully',
    data: updatedWebHome,
  });
};

// Controller to update Custom Parts Video
const updateCustomPartsVideo = async (req, res) => {
  const { customPartsVideoUrl } = req.body;
  const updatedWebHome = await webHomeServices.updateCustomPartsVideo(customPartsVideoUrl);

  if (!updatedWebHome) {
    throw new CustomError.BadRequestError('Failed to update Custom Parts Video!');
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Custom Parts Video updated successfully',
    data: updatedWebHome,
  });
};

// Controller to add a CNC Machine Part
const addCncMachinePart = async (req, res) => {
  const partData = req.body;
  
  // Upload image
  const imageUrl = await fileUploader(req.files, `cnc-machine-part-${partData.title_en}`, 'image');
  partData.image = imageUrl
  
  const updatedWebHome = await webHomeServices.addCncMachinePart(partData);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    status: 'success',
    message: 'CNC Machine Part created successfully',
    data: updatedWebHome,
  });
};

// Controller to delete a CNC Machine Part
const deleteCncMachinePart = async (req, res) => {
  const { id } = req.params;
  const updatedWebHome = await webHomeServices.deleteCncMachinePart(id);

  if (!updatedWebHome) {
    throw new CustomError.NotFoundError('CNC Machine Part not found or already deleted!');
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'CNC Machine Part deleted successfully',
    data: updatedWebHome,
  });
};

// Controller to add a custom Part
const addCustomPart = async (req, res) => {
  const {video_url} = req.body;
  
  const customParts = await webHomeServices.createCustomPartsVideo(video_url)
  if(!customParts){
    throw new CustomError.BadRequestError("Failed to create new custom parts!")
  }

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    status: 'success',
    message: 'CNC Machine Part created successfully',
    data: updatedWebHome,
  });
};

// Controller to delete a CNC Machine Part
const deleteCncMachinePart = async (req, res) => {
  const { id } = req.params;
  const updatedWebHome = await webHomeServices.deleteCncMachinePart(id);

  if (!updatedWebHome) {
    throw new CustomError.NotFoundError('CNC Machine Part not found or already deleted!');
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'CNC Machine Part deleted successfully',
    data: updatedWebHome,
  });
};

module.exports = {
  initializeWebHome,
  getWebHome,
  addCncMachinePart,
  deleteCncMachinePart,
};
