## ![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) General Assembly, Software Engineering Immersive

# KAP: Your Stay At Home Guide

## Overview 

KAP is the first full-stack app created during my time on GA's Software Engineering Immersive course, but was the third project overall. 

The app includes a RESTful API, built using Express, MongoDB, NodeJS and uses a React front-end. 

This was a **group project** which was to be completed in **nine days**.

Inspired by the Covid-19 lockdown, the app provides collections of activities which users can browse through whilst they are kept indoors. This includes books to read, recipies to cook, games to play and series or movies to watch. 

Browsing through the app can be done so by anybody who lands on the app, however more is available to users who create an account. 

When users do make an account, they are given their own profile page and have a variety of new functionality available to them: 

- Upload new activities to any of the collections

- Follow other users on the website

- Comment and rate on any of the activities to provide opinion and remove them if necessary

- Favourtise activities which can then be viewed on their profile page.


## The Brief 

* Work in a team, using **git to code collaboratively**.
* **Build a full-stack application** by building your own backend and your own front-end
* **Use an Express API** to serve your data from a Mongo database
* **Consume your API with a separate front-end** using React
* **Be a complete product** have CRUD functionality implemented and a few models that have relationships. 

## Technologies Used 

- HTML5
- SASS
- JavaScript (ES6)
- React
- Express
- Node.js
- Mongo and Mongoose
- Email Validator
- Mongoose
- JSON Web Token 
- Axios
- Git and GitHub
- GSAP
- Google Fonts

## The Approach 

### Planning

- One of the first discussions which took place was the concept of our app. Between us all, we thought a topic that held relevacy was important to consider and with the lockdown having been implented fully only a few weeks before, it seemed like a good place to start. Another key deciding factor was if we wanted our app to limited to just one collection. Again, because lockdown limited how much could be accomplished for the public, we thought we would challenge ourselves by having a range of collections. Following this, we realised we wanted to make our content as rich as possible for users and we quickly started working on our models and collections. 

## Back-end

<h4>The app contained multiple collections and for the purpose of understanding the approach to building the content in the app, I have split this section into two. How the content was approached and the functionality for users who visit the page.</h4>

<h3 style='text-decoration: underline'> Collections </h3>

<h4>Models </h4>

- For our collections, we specified four models which utilises Mongoose which provides a built in Schema class. Each of these models are very detailed. This was so users could get a high level of detail from the app and so they knew it would suit their individual tastes.  

A Cook Schema for our recipes: 

```js
const cookSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  ingredients: { type: Array, required: true },
  description: { type: String, required: true, maxlength: 1000 },
  image: { type: String, required: false },
  method: { type: Array, required: true },
  prepTime: { type: String, required: true },
  cookTime: { type: String, required: true },
  serves: { type: String, required: true },
  rating: { type: Number, required: true },
  category: { type: String, required: true },
  mealtype: { type: String, required: true },
  dietary: { type: Array, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  savedBy: { type: Array, required: true },
  comments: [ commentSchema ]
  
})

```

A Play Schema for the games: 

```js
const playSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true, maxlength: 2000 },
  image: { type: String, required: false },
  genre: { type: Array, required: true },
  rating: { type: Number, required: true },
  subcategory: { type: String, required: true },
  players: { type: String, required: true },
  format: { type: String, required: false },
  duration: { type: String, required: false },
  category: { type: String, required: true },
  link: { type: String, required: false },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  savedBy: { type: Array, required: true },
  comments: [ commentSchema ]
  
})
```

A Read Schema for books: 

```
const readSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  description: { type: String, required: true, maxlength: 2000 },
  genre: { type: Array, required: true },
  bookType: { type: String, required: true },
  image: { type: String, required: false },
  rating: { type: Number, required: true },
  category: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [ commentSchema ],
  savedBy: { type: Array, required: true }

})
```

and finally a Watch Schema for movies and TV series:

```js
const watchSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true, maxlength: 1000 },
  genre: { type: Array, required: true },
  image: { type: String, required: false },
  trailer: { type: String, required: false },
  director: { type: String, required: false },
  duration: { type: String, required: false },
  seasons: { type: String, required: false },
  rating: { type: Number, required: true },
  certification: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: false },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  savedBy: { type: Array, required: true },
  comments: [ commentSchema ]
})
```

- All of these Schemas have a few feilds which are repeated:

  - User: This assigns a user to every activity and uses a **referenced** relationship 

  - Comments: Every activity has an array of comments, which is a **embedded**  relationship 

  - savedBy: This field is to identify which users saved that activity 

- Having decided our models, we could now move on to create the data for our app. This was implemented using a **seed file**. This file is hard-coded Recipies, Games, TV Series, Films and Books which was planted into our MongoDB. After completing this, we could look at building the end points for this API.

<h4>Router</h4>

We then procceded to create a `router.js` file to determine our API endpoints to how each of collections would be called on. Due to our Mongo database holding more than one collection, we specified 'category' as being as end point per collection which will be explained when discussing the controller. 

```js
router.route('/:category/:id')
  .get(itemController.singleItemId)
  .put(secureRoute, itemController.editActivity)
  .post(secureRoute, itemController.addActivity)


router.route('/:category')
  .get(itemController.all)
  .post(secureRoute, itemController.addActivity)


router.route('/:category/:id/comments')
  .post(secureRoute, itemController.addNewComment)

router.route('/:category/:id/comments/:commentid')
  .put(secureRoute, itemController.editComment)
  .delete(secureRoute, itemController.deleteComment)
```

- These were the endpoints we created for our collections. As shown, each of these endpoints replies on a seperate function in our `itemController` file to retrive information from the database. 

<h4>Item Controller</h4>

To be able to access all of our collections easily, and keep the code DRY, we implemented our functions to be able to find on of collections through this method: 

```js
const category = req.params.category[0].toUpperCase() + req.params.category.slice(1)
```

 - In retriving our data, we noticed when we made requests that the collections we wanted access to had been assigned the names we chose in our seed file. However, in our requests, these names had been changed to all be lowercase and in order to access them, we needed to call the exact name, where the first letter was uppercase. Through the method outlined about, we took the request and changed the first letter to uppercase allowing us access to any of our collections. 

 - Having accomplished this, we were able to detail specific functions to access all of the data in our database or to find a specific activity by the id assigned to it. 

<h3 style='text-decoration: underline'> User </h3>

<h4> Model </h4>















