const mongoose = require('mongoose')


const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: [3, "Votre titre doit faire au moins 3 caractères."],
    maxLength: [120, "Votre titre doit faire moins de 120 caractères."],
    required: [true, "Merci de préciser un titre pour votre recette."]
  },
  description: {
    type: String,
    maxLength: [600, "Votre description doit faire au maximum 600 caractères."]
  },
  difficulty: {
    type: String,
    enum: {
      values: ["facile", "moyen", "difficile"],
      message: 'La difficulté peut prendre les valeur "facile", "moyen" ou "difficile"'
    },
    trim: true,
    default: "moyen",
    required: [true, "Merci de préciser un niveau de difficulté."]
  },
  images: [String],
  ratingsAverage: {
    type: Number,
    default: 1,
    min: [1, "La note minimale est de 1."],
    max: [5, "La note maximale est de 5."]
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  time: {
    type: Number,
    min: [0, "Le temps de préparation de la recette doit être supérieur à 0 minutes."],
    max: [4320, "Sérieusement ? Qui a le temps de faire une recette sur plus de 3 jours ? Merci de sélectionner un temps inférieur à 4320 minutes."],
    required: [true, "Merci de préciser un temps de préparation, en minutes."]
  },
  category: {
    type: String,
    enum: {
      values: ["entree", "plat", "dessert", "boisson", "snack", "fromage", "petit-dejeuner", "autre"],
      message: 'La catégorie de votre recette doit prendre une des valeurs suivantes : "entree", "plat", "dessert", "boisson", "snack", "fromage", "petit-dejeuner" ou "autre".'
    },
    default: "autre"
  },
  themes: [String],
  otherLink: {
    type: String,
    validate: function (link) {
      const regexRule = /^(http|https):\/\//;
      return regexRule.test(link)
    },
    message: "Merci de fournir un lien valide."
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Merci de préciser l'auteur de cette recette par son ID."]
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  ingredients: {
    type: [
      {
        quantity: {
          type: Number,
          min: [0, "La quantité ne peut pas être inférieure à 0."]
        },
        name: {
          type: String,
          trim: true,
          maxLength: [36, "Le nom de votre ingrédient doit faire 36 caractères au maximum."],
          required: [true, "Merci de préciser un nom pour l'ingrédient."]
        },
        unite: {
          type: String,
          maxLength: [6, "L'unité ne peut pas dépasser 6 caractères."]
        }
      }
    ],
    required: [true, "Merci de préciser au moins 1 ingrédient pour la recette."]
  },
  steps: {
    type: [
      {
        description: {
          type: String,
          minLength: [0, "Merci de compléter l'étape."],
          maxLength: [800, "Le descriptif de votre étape ne peut pas dépasser 800 caractères. Merci de séparer l'étapes en plusieurs."],
        }
      }
    ],
    required: [true, "Merci de préciser au moins 1 étape pour cette recette."]
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe