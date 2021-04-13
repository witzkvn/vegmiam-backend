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
  .post(recipeController.createRecipe)

router
  .route('/:id')
  .get(recipeController.getRecipe)

router
  .route('/user/:userrecipesid')
  .get(recipeController.getAllRecipes)

router.use('/:id', authController.onlyUserDoc(Recipe))
// all routes below have doc protection : requester can only manipulate his own documents
router
  .route('/:id')
  .patch(recipeController.updateRecipe)
  .delete(recipeController.deleteRecipe)




module.exports = router;