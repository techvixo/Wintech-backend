const express = require('express');
const webHomeControllers = require('./webHome.controllers');
const authorization = require('../../middlewares/authorization');

const webHomeRouter = express.Router();

webHomeRouter.post('/initialize', webHomeControllers.initializeWebHome)
webHomeRouter.get('/', webHomeControllers.getWebHome)
webHomeRouter.post('/cnc-machine-part/create', authorization('admin'), webHomeControllers.addCncMachinePart)
webHomeRouter.delete('/cnc-machine-part/delete/:id', authorization('admin'), webHomeControllers.deleteCncMachinePart)
webHomeRouter.post('/custom-parts/create', authorization('admin'), webHomeControllers.addCustomPart)
webHomeRouter.delete('/custom-parts/delete', authorization('admin'), webHomeControllers.deleteCustomPart)
webHomeRouter.post('/featured-video/add', authorization('admin'), webHomeControllers.addFeaturedVideo)
webHomeRouter.delete('/featured-video/delete', authorization('admin'), webHomeControllers.deleteFeaturedVideo)

module.exports = webHomeRouter;