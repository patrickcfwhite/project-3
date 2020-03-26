const mongoose = require('mongoose')
const Read = require('./models/read')
const Cook = require('./models/cook')
const Watch = require('./models/watch')
const Play = require('./models/play')
const User = require('./models/user')
const dbURI = 'mongodb://localhost/activity-db'

function createBooks(users) {

  return Read.create(
    [{
      title: '1984',
      author: 'George Orwell',
      description: 'Winston Smith wrestles with oppression in Oceania, a place where the Party scrutinizes human actions with ever-watchful Big Brother. Defying a ban on individuality, Winston dares to express his thoughts in a diary and pursues a relationship with Julia. These criminal deeds bring Winston into the eye of the opposition, who then must reform the nonconformist',
      genre: ['Dystopian, Political fiction, Social Science'],
      bookType: 'Novel',
      image: '',
      rating: 4,
      user: users[0],
      category: 'Read'
    }]
  )
}

function createRecipes(users) {
  return Cook.create([
    {
      title: 'Chicken & Chorizo Jambalaya',
      ingredients: [
        '1 tbsp olive oil'
        , '2 chicken breasts'
        , '1 chopped onion'
        , '1 red pepper'
        , '2 thinly sliced garlic cloves'
        , '75g crushed chorizo'
        , '1 tbsp sliced Cajun seasoning'
        , '250g long grain rice'
        , '400g can plum tomato'
        , '350ml chicken stock'
      ],
      description: 'A Cajun-inspired rice pot recipe with spicy Spanish sausage, sweet peppers and tomatoes.',
      method: [
        'Heat 1 tbsp olive oil in a large frying pan with a lid and brown 2 chopped chicken breasts for 5-8 mins until golden.'
        , 'Remove and set aside. Tip in the 1 diced onion and cook for 3-4 mins until soft.'
        , 'Add 1 thinly sliced red pepper, 2 crushed garlic cloves, 75g sliced chorizo and 1 tbsp Cajun seasoning, and cook for 5 mins more.'
        , 'Stir the chicken back in with 250g long grain rice, add the 400g can of tomatoes and 350ml chicken stock. Cover and simmer for 20-25 mins until the rice is tender.'
      ],
      prepTime: '10 minutes',
      cookTime: '45 minutes',
      serves: '4',
      rating: 5,
      mealtype: 'Main meal',
      dietary: 'none',
      user: users[0],
      category: 'Cook'

    }
  ])
  // .then(recipes => console.log(`${'🍽'.repeat(recipes.length)} created!`))
}

function createWatch(users) {
  return Watch.create([
    {
      title: 'Spirited Away',
      description: 'Spirited Away tells the story of Chihiro Ogino, a 10 year-old girl who, while moving to a new neighbourhood, enters the world of Kami (spirits) of Japanese Shinto folklore.',
      genre: 'Animation, Fantasy, Adventure, Family',
      duration: '125 minutes',
      rating: 5,
      certification: 'PG',
      user: users[0],
      category: 'Watch'
    }
  ])
}

function createPlay(users) {
  return Play.create([
    {
      title: 'Sims 4',
      description: 'The Sims 4 is a life simulation game, players create a Sim character and control their life to explore different personalities which change the way the game plays out.',
      genre: 'Simulation',
      rating: 5,
      players: '1',
      subcategory: 'Computer Game',
      format: 'PC',
      user: users[0],
      category: 'Play'
    }
  ])
}

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (error, db) => {
    if (error) {
      return console.log(error)
    }
    console.log('Ready to seed database!')
    db.dropDatabase()
      .then(() => {
        return User.create(
          [
            {
              username: 'patrick',
              email: 'patrick@patrick.com',
              password: 'patrick',
              passwordConfirmation: 'patrick',
              firstname: 'Patrick',
              uploads: [],
              savedItems: [],
              following: []
            },
            {
              username: 'kenn',
              email: 'kenn@kenn.com',
              password: 'kenn',
              passwordConfirmation: 'kenn',
              firstname: 'Kenn',
              uploads: [],
              savedItems: [],
              following: []
            },
            {
              username: 'annie',
              email: 'annie@annie.com',
              password: 'annie',
              passwordConfirmation: 'annie',
              firstname: 'Annie',
              uploads: [],
              savedItems: [],
              following: []
            }
          ])
      })
      .then((users) => {
        createBooks(users)
        createRecipes(users)
        createWatch(users)
        createPlay(users)
          .then(() => console.log('Successfully seeded database'))
          .catch(error => console.log(error))
          .finally(() => mongoose.connection.close())
      })
  })










// .then(() => {
//   return Watch.create(
//     {
//       title: 'Spirited Away',
//       description: 'Spirited Away tells the story of Chihiro Ogino, a 10 year-old girl who, while moving to a new neighbourhood, enters the world of Kami (spirits) of Japanese Shinto folklore.',
//       genre: 'Animation, Fantasy, Adventure, Family',
//       duration: '125 minutes',
//       rating: 5,
//       certification: 'PG',
//       user: users[0],
//       category: 'Watch'
//     }
//   )
// })
// .then(films => console.log(`${'🎥'.repeat(films.length)} created!`))
// .then(() => {
//   return Play.create(
//     {
//       title: 'Sims 4',
//       description: 'The Sims 4 is a life simulation game, players create a Sim character and control their life to explore different personalities which change the way the game plays out.',
//       genre: 'Simulation',
//       rating: 5,
//       players: '1',
//       subcategory: 'Computer Game',
//       format: 'PC',
//       user: users[0],
//       category: 'Play'
//     }
//   )
// })
// .then(recipes => console.log(`${'🎥'.repeat(recipes.length)} created!`))