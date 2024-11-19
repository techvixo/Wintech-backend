const express = require("express");
const heroControllers = require("./hero.controllers");

const heroRouter = express.Router();

heroRouter.post('/create', heroControllers.createHero)
heroRouter.get('/retrive/all', heroControllers.getAllHeroes)
heroRouter.delete('/delete/:id', heroControllers.deleteSpecificHero)

module.exports = heroRouter