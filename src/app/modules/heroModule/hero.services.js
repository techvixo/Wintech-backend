const Hero = require('./hero.model');

// Service to create a hero
const createHero = async (data) => {
  return await Hero.create(data);
};

// Service to get all heroes
const getAllHeroes = async () => {
  return await Hero.find({});
};

// Service to delete a hero
const deleteHero = async (id) => {
  return await Hero.deleteOne({ _id: id });
};

module.exports = {
  createHero,
  getAllHeroes,
  deleteHero,
};
