const heroServices = require('./hero.services')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../../errors/index')
const sendResponse = require('../../../shared/sendResponse')
const fileUploader = require('../../../utils/fileUploader')
const Hero = require('./hero.model')

// Controller for creating a new hero
const createHero = async (req, res) => {
  const heroData = req.body

  const getHero = await heroServices.getHero()
  if (getHero) {
    throw new CustomError.BadRequestError(
      'You already have a hero. Delete to create one or update that hero!'
    )
  }

  // Upload images if any
  const heroImages = await fileUploader(
    req.files,
    `hero-image-${heroData.title_en}`,
    'images'
  )
  heroData.images = heroImages

  const hero = await heroServices.createHero(heroData)
  if (!hero) {
    throw new CustomError.BadRequestError('Failed to create new hero!')
  }

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    status: 'success',
    message: 'Hero creation successful',
    data: hero
  })
}

// Controller for getting all heroes
const getAllHeroes = async (req, res) => {
  const heroes = await heroServices.getHero()
  if (heroes.length === 0) {
    throw new CustomError.NotFoundError('No heroes found!')
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Heroes retrieved successfully',
    data: heroes
  })
}

// Controller for getting a specific hero by ID
const getSpecificHero = async (req, res) => {
  const { id } = req.params

  const hero = await heroServices.getSpecificHero(id)
  if (!hero) {
    throw new CustomError.NotFoundError('Hero not found!')
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Hero retrieved successfully',
    data: hero
  })
}

// controller for add image
const addHeroImages = async (req, res) => {
  const { id } = req.params

  // Upload new images using the `fileUploader` utility
  const uploadedImagePaths = await fileUploader(
    req.files,
    `hero-image`,
    'images'
  )

  // Fetch the hero document
  const hero = await Hero.findById(id)
  if (!hero) {
    throw new CustomError.NotFoundError('Hero not found!')
  }

  // Add the uploaded image paths to the hero's images array
  hero.images.push(...uploadedImagePaths)
  await hero.save()

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Images added successfully.'
  })
}

// controller for removing image
const removeHeroImages = async (req, res) => {
  const { id } = req.params
  const { images } = req.body

  // Update the hero's images array
  const hero = await heroServices.getHero()
  if (!hero) {
    throw new CustomError.NotFoundError('Hero not found!')
  }

  hero.images = hero.images.filter((img) => !images.includes(img))
  await hero.save()

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Images removed successfully',
    data: hero
  })
}

// Controller for updating a specific hero
const updateHeroDetails = async (req, res) => {
  const { id } = req.params
  const updateData = req.body

  // Update hero details
  const hero = await heroServices.updateHeroDetails(id, updateData)
  if (!hero) {
    throw new CustomError.NotFoundError('Hero not found!')
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Hero details updated successfully',
  })
}

// Controller for deleting a specific hero
const deleteSpecificHero = async (req, res) => {
  const { id } = req.params

  const result = await heroServices.deleteSpecificHero(id)
  if (!result.deletedCount) {
    throw new CustomError.NotFoundError('Hero deletion failed!')
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Hero deleted successfully'
  })
}

module.exports = {
  createHero,
  getAllHeroes,
  getSpecificHero,
  addHeroImages,
  removeHeroImages,
  updateHeroDetails,
  deleteSpecificHero
}
