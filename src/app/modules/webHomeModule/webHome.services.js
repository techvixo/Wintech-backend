const WebHome = require('./webHome.model');

// General Service for initializing WebHome if not created
const initializeWebHome = async (data) => {
  const webHome = await WebHome.create(data);
  return webHome;
};

// General Service to get WebHome data
const getWebHome = async () => {
  return await WebHome.findOne();
};

// Service to update featured_video
const updateFeaturedVideo = async (data) => {
  return await WebHome.findOneAndUpdate({}, { featured_video: data }, { new: true, runValidators: true });
};

// Service to update custom_parts_video
const updateCustomPartsVideo = async (videoUrl) => {
  return await WebHome.findOneAndUpdate({}, { custom_parts_video: videoUrl }, { new: true });
};

// Service to add a new item to cnc_machine_part array
const addCncMachinePart = async (partData) => {
  return await WebHome.findOneAndUpdate({}, { $push: { cnc_machine_part: partData } }, { new: true });
};

// Service to delete an item from cnc_machine_part array by part ID
const deleteCncMachinePart = async (partId) => {
  return await WebHome.findOneAndUpdate({}, { $pull: { cnc_machine_part: { _id: partId } } }, { new: true });
};

module.exports = {
  initializeWebHome,
  getWebHome,
  updateFeaturedVideo,
  updateCustomPartsVideo,
  addCncMachinePart,
  deleteCncMachinePart,
};
