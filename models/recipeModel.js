const mongoose = require('mongoose')


const recipeSchema = new mongoose.Schema({
  name: String,
  difficulty: String
})

const recipe = mongoose.model('Recipe', recipeSchema)

module.exports = recipeSchema