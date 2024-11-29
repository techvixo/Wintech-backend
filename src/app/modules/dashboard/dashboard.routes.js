const express = require('express');
const { dashboard } = require('./dashboard.controller');

const dashbaordRouter = express.Router();

dashbaordRouter.get('/retrive/insights', dashboard)

module.exports = dashbaordRouter;