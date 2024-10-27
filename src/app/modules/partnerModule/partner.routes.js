const express = require('express');
const partnerControllers = require('./partner.controllers');
const requestValidator = require('../../middlewares/requestValidator');
const PartnerValidationZodSchema = require('./partner.validation');

const partnerRouter = express.Router();

partnerRouter.post(
    '/create',
    requestValidator(PartnerValidationZodSchema.createPartnerZodSchema),
    partnerControllers.createPartner
  )
  partnerRouter.get('/all', partnerControllers.getAllPartners)
  partnerRouter.get(
    '/:id',
    requestValidator(PartnerValidationZodSchema.specificPartnerZodSchema),
    partnerControllers.getSpecificPartner
  )
  partnerRouter.patch(
    '/update/:id',
    requestValidator(PartnerValidationZodSchema.specificPartnerZodSchema),
    partnerControllers.updateSpecificPartner
  )
  partnerRouter.delete(
    '/delete/:id',
    requestValidator(PartnerValidationZodSchema.specificPartnerZodSchema),
    partnerControllers.deleteSpecificPartner
  )

module.exports = partnerRouter;