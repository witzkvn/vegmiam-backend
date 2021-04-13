const factory = require('./handlerFactory')
const Recipe = require('../models/recipeModel')
const catchAsync = require('../utils/catchAsync')

exports.createRecipe = factory.createOne(Recipe)
exports.deleteRecipe = factory.deleteOne(Recipe);
// exports.getRecipe = factory.getOne(Recipe, { path: 'reviews' });
exports.getRecipe = factory.getOne(Recipe);
exports.getAllRecipes = factory.getAll(Recipe);
// exports.getAllUserRecipes = factory.getAll(Recipe);
exports.updateRecipe = factory.updateOne(Recipe);