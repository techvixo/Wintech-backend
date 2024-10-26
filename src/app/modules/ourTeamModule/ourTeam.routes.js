const express = require('express');
const ourTeamControllers = require('./ourTeam.controllers');
const requestValidator = require('../../middlewares/requestValidator');
const OurTeamValidationZodSchema = require('./ourTeam.validation');

const ourTeamRouter = express.Router();

ourTeamRouter.post(
    '/create',
    requestValidator(OurTeamValidationZodSchema.createOurTeamZodSchema),
    ourTeamControllers.createTeamMember
  )
  ourTeamRouter.get('/all', ourTeamControllers.getAllTeamMembers)
  ourTeamRouter.get(
    '/:id',
    requestValidator(OurTeamValidationZodSchema.specificOurTeamZodSchema),
    ourTeamControllers.getSpecificTeamMember
  )
  ourTeamRouter.patch(
    '/update/:id',
    requestValidator(OurTeamValidationZodSchema.specificOurTeamZodSchema),
    ourTeamControllers.updateSpecificTeamMember
  )
  ourTeamRouter.delete(
    '/delete/:id',
    requestValidator(OurTeamValidationZodSchema.specificOurTeamZodSchema),
    ourTeamControllers.deleteSpecificTeamMember
  )


module.exports = ourTeamRouter