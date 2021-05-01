const express = require('express')
const authController = require('../controllers/authController');
const recipeController = require('../controllers/recipeController');
const Recipe = require('../models/recipeModel');


const router = express.Router();

// all routes below are protected - needs to be logged in to access
router.use(authController.protect);

router
  .route('/')
  .get(recipeController.getAllRecipes)
  .post(recipeController.uploadRecipeImages, recipeController.resizeRecipeImages, recipeController.createRecipe)


router
  .route('/fav')
  .get(recipeController.getUserFavRecipes)

router
  .route('/fav/:id')
  .get(recipeController.toggleFavoriteRecipe)

router
  .route('/:id')
  .get(recipeController.getRecipe)

// à faire recipes by user id
router
  .route('/user/:userrecipesid')
  .get(recipeController.getAllRecipes)

// router.use('/modify/:id', authController.onlyUserDoc(Recipe))
// all routes below have doc protection : requester can only manipulate his own documents
router
  .route('/modify/:id')
  .patch(authController.onlyUserDoc(Recipe), recipeController.updateRecipe)

router
  .route('/delete/:id')
  .delete(authController.onlyUserDoc(Recipe), recipeController.deleteRecipe)




module.exports = router;