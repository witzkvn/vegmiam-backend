const mongoose = require('mongoose')
const slugify = require('slugify')


const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: [3, "Votre titre doit faire au moins 3 caractères."],
    maxLength: [120, "Votre titre doit faire moins de 120 caractères."],
    required: [true, "Merci de préciser un titre pour votre recette."]
  },
  slug: String,
  description: {
    type: String,
    maxLength: [600, "La description de la recette doit faire au maximum 600 caractères."]
  },
  difficulty: {
    type: String,
    enum: {
      values: ["facile", "moyen", "difficile"],
      message: 'La difficulté peut prendre les valeurs "facile", "moyen" ou "difficile"'
    },
    trim: true,
    default: "moyen"
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
    max: [4320, "Le temps de préparation d'une recette ne peut pas dépasser 3 jours. Merci de sélectionner un temps inférieur à 4320 minutes."],
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
      if (!link) return true
      const regexRule = /^(http|https):\/\//;
      return regexRule.test(link) || ""
    },
    message: "Merci de fournir un lien valide pour le champs Lien Utile."
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
          min: [0, "Une quantité pour un ingrédient ne peut pas être inférieure à 0."]
        },
        name: {
          type: String,
          trim: true,
          maxLength: [36, "Le nom de vos ingrédients ne doivent pas dépasser 36 caractères."],
          required: [true, "Merci de préciser un nom pour chaque ingrédient ajouté, ou de supprimer les champs inutilisés."]
        },
        unite: {
          type: String,
          maxLength: [6, "L'unité d'un ingrédient ne peut pas dépasser 6 caractères."]
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
          minLength: [0, "Merci de compléter les descriptions de chaque étape ou de supprimer les étapes vides."],
          maxLength: [800, "Le descriptif d'une étape ne peut pas dépasser 800 caractères. Merci de séparer les étapes trop longues en plusieurs."],
        }
      }
    ],
    required: [true, "Merci de préciser au moins 1 étape pour cette recette."]
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

recipeSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true })
  next()
})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe