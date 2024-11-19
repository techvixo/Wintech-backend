const Hero = require('./hero.model')

// service for create hero
const createHero = async (data) => {
  return await Hero.create(data)
}

// service for get hero
const getHero = async () => {
  return await Hero.findOne({})
}

// service for update hero
const updateHeroDetails = async (id, updateData) => {
  const hero = await Hero.findByIdAndUpdate(id, updateData, { new: true })
  return hero
}

// service for delete hero
const deleteHero = async (id) => {
  return await Hero.deleteOne({ _id: id })
}

module.exports = {
  createHero,
  getHero,
  updateHeroDetails,
  deleteHero
}
