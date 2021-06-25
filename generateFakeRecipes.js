const faker = require('faker');
const Recipe = require('./models/recipeModel')

// console.log(faker.image.imageUrl(null, null, 'food', true))

const createRecipes = async () => {

  for (let i = 0; i < 2; i++) {

    const createOnefakeRecipe = async () => {
      return {

        title: faker.name.title(),
        description: faker.lorem.words(20),
        difficulty: faker.random.arrayElement(["facile", "moyen", "difficile"]),
        ratingsAverage: faker.datatype.number({ min: 1, max: 5, precision: 0.1 }),
        ratingsQuantity: faker.datatype.number({ min: 0, max: 1000, precision: 1 }),
        time: faker.datatype.number({ min: 0, max: 4320, precision: 1 }),
        images: [
          faker.image.imageUrl(null, null, 'food', true),
          faker.image.imageUrl(null, null, 'food', true),
          faker.image.imageUrl(null, null, 'food', true)
        ],
        "category": faker.random.arrayElement(["entree", "plat", "dessert", "boisson", "snack", "fromage", "petit-dejeuner", "autre"]),
        "themes": [faker.lorem.word(6), faker.lorem.word(8), faker.lorem.word(4)],
        "otherLink": "https://www.youtube.com/watch?v=xEUAP2pYPQw",
        "user": "6075b328d1fa521eb4ef2da8",
        "ingredients": [
          {
            "quantity": faker.datatype.number({ min: 1, max: 500, precision: 0.25 }),
            "name": faker.lorem.word(6),
            "unite": faker.lorem.word(2)
          },
          {
            "quantity": faker.datatype.number({ min: 1, max: 500, precision: 0.25 }),
            "name": faker.lorem.word(6),
            "unite": faker.lorem.word(2)
          },
          {
            "quantity": faker.datatype.number({ min: 1, max: 500, precision: 0.25 }),
            "name": faker.lorem.word(6),
            "unite": faker.lorem.word(2)
          },
          {
            "quantity": faker.datatype.number({ min: 1, max: 500, precision: 0.25 }),
            "name": faker.lorem.word(6),
            "unite": faker.lorem.word(2)
          },
          {
            "quantity": faker.datatype.number({ min: 1, max: 500, precision: 0.25 }),
            "name": faker.lorem.word(6),
            "unite": faker.lorem.word(2)
          },
          {
            "quantity": faker.datatype.number({ min: 1, max: 500, precision: 0.25 }),
            "name": faker.lorem.word(6),
            "unite": faker.lorem.word(2)
          },
        ],
        "steps": [
          {
            "description": faker.lorem.sentence(12)
          },
          {
            "description": faker.lorem.sentence(12)
          },
          {
            "description": faker.lorem.sentence(12)
          },
          {
            "description": faker.lorem.sentence(12)
          },
          {
            "description": faker.lorem.sentence(12)
          },
          {
            "description": faker.lorem.sentence(12)
          },
          {
            "description": faker.lorem.sentence(12)
          },
          {
            "description": faker.lorem.sentence(12)
          },
          {
            "description": faker.lorem.sentence(12)
          },
          {
            "description": faker.lorem.sentence(12)
          },
        ],
      }
    }

    try {
      const recipe = await createOnefakeRecipe()
      await Recipe.create(recipe)
      console.log('success')
    } catch (error) {
      console.log(error)
    }
  }
}



createRecipes()




// {
//   "title": "Lasagnes aux légumes",
//   "description": "Un superbe plat de lasagnes riche en légumes et facile à faire. Redécouvrez une recette classique revisitée aux légumes du soleil. Idéal pour faire le plein d'énergie !",
//   "difficulty": "moyen",
//   "ratingsAverage": 4.2,
//   "ratingsQuantity": 6,
//   "time": 50,
//   "images": [
//     "https://s3-eu-west-1.amazonaws.com/images-ca-1-0-1-eu/recipe_photos/original/548/lasagnes-de-legumes-0.jpg",
//     "https://cac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2018.2F09.2F25.2F1e5a6bf4-7fc5-4d5f-8baf-1f9a12081497.2Ejpeg/748x372/quality/80/crop-from/center/lasagnes-aux-legumes-grilles-et-pesto-rosso.jpeg",
//     "https://www.regal.fr/sites/art-de-vivre/files/r61_lasagnes-legumes-soleil_bw.jpg"
//   ],
//   "category": "plat",
//   "themes": ["italien", "pates", "tomate", "four"],
//   "otherLink": "https://www.youtube.com/watch?v=xEUAP2pYPQw",
//   "user": "6075b328d1fa521eb4ef2da8",
//   "ingredients": [
//     {
//       "quantity": 2,
//       "name": "aubergines",
//       "unite": ""
//     },
//     {
//       "quantity": 3,
//       "name": "poivrons",
//       "unite": ""
//     },
//     {
//       "quantity": 35,
//       "name": "farine",
//       "unite": "g"
//     },
//     {
//       "quantity": 50,
//       "name": "lait",
//       "unite": "cL"
//     },
//     {
//       "quantity": 2,
//       "name": "parmesan",
//       "unite": "cas"
//     }
//   ],
//   "steps": [
//     {
//       "description": "Eplucher et couper les aubergines en gros dés."
//     },
//     {
//       "description": "Cuire immédiatement à l'eau frémissante pendant 10' égoutter et presser."
//     },
//     {
//       "description": "Suer les oignons et l'ail à l'huile d'olive."
//     },
//     {
//       "description": "Ajouter les poivrons épluchés en lanières et laisser étuver 10 minutes."
//     },
//     {
//       "description": "Suer les aubergines à l'huile d'olive et ajouter le parmesan."
//     },
//     {
//       "description": "Poser une première couche de plaques de lasagnes au fond du plat huilé."
//     },
//     {
//       "description": "Déposer uniformément les aubergines suées et répartir le pesto."
//     },
//     {
//       "description": "Mettre au four 45 minutes à 170°C."
//     }
//   ]
// }