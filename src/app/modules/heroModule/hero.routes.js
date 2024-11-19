const express = require("express");
const heroControllers = require("./hero.controllers");

const heroRouter = express.Router();

heroRouter.post('/create', heroControllers.createHero)
heroRouter.get('/retrive', heroControllers.getAllHeroes)
heroRouter.patch('/add-image/:id', heroControllers.addHeroImages)
heroRouter.patch('/remove-image/:id', heroControllers.removeHeroImages)
heroRouter.patch('/update/:id', heroControllers.updateHeroDetails)
heroRouter.post('/delete/:id', heroControllers.deleteSpecificHero)

module.exports = heroRouter