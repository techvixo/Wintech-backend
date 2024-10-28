const express = require('express');
const bannerControllers = require('./banner.controllers');
const requestValidator = require('../../middlewares/requestValidator');
const BannerValidationZodSchema = require('./banner.validation');

const bannerRouter = express.Router();

bannerRouter.post(
    '/create',
    requestValidator(BannerValidationZodSchema.createBannerZodSchema),
    bannerControllers.createBanner
  )
  bannerRouter.get('/all', bannerControllers.getAllBanners)
  bannerRouter.get(
    '/:id',
    requestValidator(BannerValidationZodSchema.specificBannerZodSchema),
    bannerControllers.getSpecificBanner
  )
  bannerRouter.patch(
    '/update/:id',
    requestValidator(BannerValidationZodSchema.specificBannerZodSchema),
    bannerControllers.updateSpecificBanner
  )
  bannerRouter.delete(
    '/delete/:id',
    requestValidator(BannerValidationZodSchema.specificBannerZodSchema),
    bannerControllers.deleteSpecificBanner
  )

module.exports = bannerRouter