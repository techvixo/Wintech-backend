const express = require('express');
const webHomeControllers = require('./webHome.controllers')

const webHomeRouter = express.Router();

webHomeRouter.post('/initialize', webHomeControllers.initializeWebHome)
webHomeRouter.get('/', webHomeControllers.getWebHome)
webHomeRouter.post('/cnc-machine-part/create', webHomeControllers.addCncMachinePart)
webHomeRouter.delete('/cnc-machine-part/delete/:id', webHomeControllers.deleteCncMachinePart)
webHomeRouter.post('/custom-parts/create', webHomeControllers.addCustomPart)
webHomeRouter.delete('/custom-parts/delete', webHomeControllers.deleteCustomPart)
webHomeRouter.post('/featured-video/add', webHomeControllers.addFeaturedVideo)
webHomeRouter.delete('/featured-video/delete', webHomeControllers.deleteFeaturedVideo)

module.exports = webHomeRouter;