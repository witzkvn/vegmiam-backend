const factory = require('./handlerFactory')
const Recipe = require('../models/recipeModel')
const catchAsync = require('../utils/catchAsync')
const streamifier = require('streamifier')
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const User = require('../models/userModel')

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  // test for files type
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb(new AppError('Les fichiers envoyés ne sont pas de type image. Merci d\'envoyer des images.', 400), false)
  }
}

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
})

exports.uploadRecipeImages = upload.fields([
  {
    name: 'images',
    maxCount: 3
  }
])

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.resizeRecipeImages = catchAsync(async (req, res, next) => {
  if (!req.files.images) return next()

  // must set filename on the req to get it in updateMe
  let imagesUrlArray = []
  const dateNow = Date.now()

  await Promise.all(req.files.images.map(async (img, index) => {
    const uniqueFileName = `recipe-${req.user.id}-${dateNow}-${index}`
    try {
      let result = await uploadFromBuffer(img.buffer, req.user.id, uniqueFileName);
      await imagesUrlArray.push(result.secure_url);

    } catch (error) {
      console.log(error.response)
      throw error;
    }
  }))

  req.files.images = [...imagesUrlArray];

  next(); // next middleware is updateMe
})

let uploadFromBuffer = (buffer, userId, uniqueFileName) => {
  return new Promise((resolve, reject) => {
    let cld_upload_stream = cloudinary.uploader.upload_stream(
      {
        public_id: `recipes/${userId}/${uniqueFileName}`,
        tags: "recipe",
        transformation: { format: "jpg", quality: "auto" }
      },
      (error, result) => {

        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(buffer).pipe(cld_upload_stream);
  });
};

exports.toggleFavoriteRecipe = catchAsync(async (req, res, next) => {
  const recipeId = req.params.id;
  const userFavs = req.user.favorites;
  const existingRecipe = userFavs.indexOf(recipeId)

  if (existingRecipe === -1) {
    userFavs.push(recipeId)
  } else if (existingRecipe) {
    userFavs.splice(existingRecipe, 1)
  }
  const updatedUser = await User.findByIdAndUpdate(req.user.id, {
    favorites: [...userFavs]
  }, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
    status: 'success',
    data: {
      data: updatedUser
    },
  });
})


exports.getUserFavRecipes = catchAsync(async (req, res, next) => {
  if (!req.user.favorites || req.user.favorites.length === 0) {
    res.status(200).json({
      status: 'success',
      data: {
        data: null
      },
    });
  }

  const userFavIds = req.user.favorites;

  const favRecipes = await Recipe.find({ "_id": { $in: [...userFavIds] } })

  res.status(200).json({
    status: 'success',
    results: favRecipes.length,
    data: {
      data: favRecipes
    },
  });
})



exports.createRecipe = factory.createOne(Recipe, "user")
exports.deleteRecipe = factory.deleteOne(Recipe);
// exports.getRecipe = factory.getOne(Recipe, { path: 'reviews' });
exports.getRecipe = factory.getOne(Recipe, { path: "user" });
exports.getAllRecipes = factory.getAll(Recipe);
// exports.getAllUserRecipes = factory.getAll(Recipe);
exports.updateRecipe = factory.updateOne(Recipe);