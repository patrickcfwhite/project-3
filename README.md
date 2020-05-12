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
- Nodemailer
- Email Validator
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

To be able to access all of our collections easily, and keep the code DRY, we implemented our functions to be able to find any of the collections through this method: 

```js
const category = req.params.category[0].toUpperCase() + req.params.category.slice(1)
```

 - In retriving our data, we noticed when we made requests that the collections we wanted access to had been assigned the names we chose in our seed file. However, in our requests, these names had been changed to all be lowercase and in order to access them, we needed to call the exact name, where the first letter was uppercase. Through the method outlined about, we took the request and changed the first letter to uppercase allowing us access to any of our collections. 

 - Having accomplished this, we were able to detail specific functions to access all of the data in our database or to find a specific activity by the id assigned to it.

 - The Item Controller holds functionality to add new items or users and delete them, however we also built this function to handle existing data e.g. adding an item to a user's saved folder.

 - The example below shows the process of uploading a new item to the database. The first check is to see if this is existing data, i.e. if `req.params.id` doesn't exist, we know the item is new, and will need to added to the user's `uploads` folder. We then use our `const category` to create a new item and then this information is passed to to the 'User Controller' to handle adding it to the user's uploads folder.

```js

function addActivity(req, res) {
  console.log(req.params)
  const category = req.params.category[0].toUpperCase() + req.params.category.slice(1)
  req.body.user = req.currentUser
  const folder = !req.params.id ? 'uploads' : req.params.category !== 'user' ? 'savedItems' : 'following'
  console.log(req.params, folder)
  if (folder === 'uploads') {
    mongoose.model(category)
      .create(req.body)
      .then(item => {
        userController.addToFolder(req, res, item, folder)
      })
      .catch(error => console.log(error))
  } else {
    ...
  }
}

```

- This function also handles updating exisiting items in the database and their relation to users. For example, adding a recipe to a user's `savedItems` array, we must add the user's id to the item's `savedBy` array. Another example, if a user follows another user we update their respective folders `following`, and `followedBy`. Once we have updated the item in question, the information is passed to the 'User Controller' to update the user who is making the request.


```js

function addActivity(req, res) {
  console.log(req.params)
  const category = req.params.category[0].toUpperCase() + req.params.category.slice(1)
  req.body.user = req.currentUser
  const folder = !req.params.id ? 'uploads' : req.params.category !== 'user' ? 'savedItems' : 'following'
  console.log(req.params, folder)
  if (folder === 'uploads') {
    ...
  } else {
    mongoose.model(category).findById(req.params.id)
      .then(item => {
        console.log(item)
        const target = folder === 'savedItems' ? 'savedBy' : 'followedBy'
        userController.addToFolder(req, res, item, folder)
        item[target].some(x => x.toString() === req.currentUser._id.toString()) ? console.log('already added') : item[target].push([req.currentUser._id])
        return item.save()
      })
      .catch(error => console.log(error))
  }
}

```



<h3 style='text-decoration: underline'> User </h3>

Our approach to the User model was to allow more functionality in the app once a person registered to the website, including commenting on activities, saving activities and uploading their own to the website. Due to this, the collection itself became complex due to the amount of functionality each user had. We’ll take you through step by step on how this approached: 

<h4>Models </h4>

As we did with the content for our app, the User required a model of its own for our MongoDB to store individuals successfully. While we were able to achieve many of our stretch goals during the project, we consistently made changes to the model throughout. Realistically speaking, this was not ideal and whilst building the model, all fields should've been added even if we did not accomplish them: 

```js
const schema = new mongoose.Schema({

  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, minLength: 8, unique: true },
  password: { type: String, required: true, hide: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: false },
  interests: { type: Array, required: false, maxItems: 10 },
  uploads: { type: Array, required: true },
  savedItems: { type: Array, required: true },
  following: { type: Array, required: true },
  followedBy: { type: Array, required: true },
  resetPasswordToken: { type: String, required: false }
}, {
  timestamps: true
})
```

Our goal was to be able to make the User as personal as possible. This was due to being able to make their individual profile pages as rich as possible without giving too much away about them. However, certain areas about the User need to be protected, including to us as the developers who had direct access to the database. In order to implement this, additional features were added to the model itself to protect Users: 

  1. Shown in the model above, the `username` and `email` fields have been distinguished as being `unique=True`. This was implemented using the Mongoose Unique Validator plugin whereby Users would be unable to register with the same email address or have an existing username. 

  2. We also used the Mongoose Hidden plugin for protecting the passwords of our users. Retrieving any user from the developer perspective reduces credibility to protecting data. Using this plugin, although we as the developers can access the users who are stored into the database, the password field would not be available to us. 

Mongoose itself has some incredibly powerful inbuilt methods which we also used in conjunction with Bcrypt for passwords. Using `pre`, we were able to access Mongoose Schema’s lifecycle methods and run functions when users register or login: 

- The first function we built was for checking the password and passwordConfirmation field match from the user input during registration. If these were not to match, it would invalid and halts the user would be prompted. 

- If during registration the first function is passed and accepted, the password entered would use bcrypt to encrypt the password before being stored into the database. If under any circumstance the database were to be hacked, this would make it difficult for hackers to decrypt the passwords for users. 

- The final function checks the credentials of a user at login. The function checks the password currently stored in the database and ensures this matches the user input.  

<h4> Router </h4>

Having built our model for the user, we could now build routes and endpoints specifically for users. Some of these endpoints are specifically designed for users who are in the database and some which are available for users without an account. 

The functionality associated per endpoint is defined in our **userController.js**. In this file, we defined functions to how requests were made to the API and what responses would be given if they were accepted or not. 

<h4>Shown below are the endpoints accessible for ALL users and what functionality they allow</h4>

```js  
router.route('/register')
  .post(userController.registerUser)
```
- A single POST request where the request must match the fields of the User model which are listed as `required`. If these are not met, registeration will respond with unsuccessful.
---
```js
router.route('/login')
  .post(userController.login)
```
- A single POST request to find a user by the given email address given at registration and validate the password. If successful, the user is provided with a token using JWT. This token is stored into localStorage in the frontend. 
---
```js
router.route('/reset/')
  .get(userController.checkResetToken)
```
- In the instance a user may have forgotten their password and would link it to be reset, this GET endpoint would be used. Here, an email would’ve been sent to the user with the email address they originally registered with and provided a new token. This endpoint validates if the token is still valid in order for the password to be reset.  
---
```js
router.route('/updatePassword')
  .put(userController.updatePassword)
```
- This PUT request is used to allow a user to reset their password. Once the /reset/ endpoint has succeeded, users would be taken to a page and once submitted would check if a user with their username exists in the database. If found, their new password is encrypted using bcrypt and stored into the database. 
---
```js
router.route('/:category')
  .get(itemController.all)
router.route('/:category/:id')
  .get(itemController.singleItemId)
```
- All Users can access all full collections and singular activities using a GET request. 
---

```js
router.route('/forgotPassword')
  .post(userController.resetPassword)
```

- This function utilises the nodemailer library and allows users to have a link sent to their designated email address with a link to reset their password in the database. The function attempts to find the email located in the database, and if found will generate a new JWT token that is attached to the link in order to reset their password. We have set this token with a validation time of one hour. If not clicked through in this time, the POST request will be invalid and another email must be generated. 

<h4>All these endpoints are also available for users who create an account on the app. However, they also have additional endpoints: </h4>


```js
router.route('/user/:id')
  .delete(secureRoute, userController.deleteUser)
  .get(userController.singleUserId)
```
- This endpoint allows logged in users to follow other users and has a GET and a DELETE endpoint. Within these functions, the GET would find a user in the database and push this user into the `following` array of another user. However, if later a user decides they no longer want to follow this user's content, they would simply change the request to be DELETE.
---

**ADD TO COLLECTION**
```js
router.route('/:category')
  .post(secureRoute, itemController.addActivity)
```
**FAVOURITE ACTIVITY**
```js
router.route('/:category/:id')
  .post(secureRoute, itemController.addActivity)
```
- Once users have registered successfully, they can contribute to any of the collections using this endpoint. 
- This endpoint is also used for users to favourite activities and save them into their savedItems array by using a **seperate endpoint**. To determine this, a conditional statement is used to determine which array the item would be stored in. This is followed by finding a user by their id in the database and pushing the activity into either the `savedBy` or the `uploads` array and saves the user back into the database once completed. 
```js
router.route('/:category/:id')
  .put(secureRoute, itemController.editActivity)
```
- Another available endpoint using the id of an activity is being able to edit the item **by the user who created it**. The function allows the user to edit the item and this is saved directly back into MongoDB. 
---
```js
router.route('/user/:id/:folder/:category/:activityId')
  .delete(secureRoute, itemController.deleteActivity2)
```
- This endpoint also offers two available outputs for users. The ability to delete an activity they’ve created or to delete an activity they have favouritised. The endpoint’s designated function operates using a conditional statement on which folder is given in the request and can therefore either remove the item from the users `savedItems` array or will delete the activity from the collection as well as remove it from the other users who may have saved it. 
---

```js
router.route('/:category/:id/comments')
  .post(secureRoute, itemController.addNewComment)

router.route('/:category/:id/comments/:commentid')
  .put(secureRoute, itemController.editComment)
  .delete(secureRoute, itemController.deleteComment)

```
- The final bit of functionality decided for registered users is to be able to comment on activities. This required having a POST endpoint per activity and to edit or delete a comment would be a PUT or DELETE request to that comment using its unique id. 
---

<h4>User Controller</h4>

 - The User Controller holds functionality to update the logged-in user. Whether it is adding a newitem to their `uploads` array, or an exisiting item to their `savedItems` array, or if they want to update who they are following. The information will first be updated by the 'Item Controller' and then passed to the the function below, which determines how the user should be amended.

```js

function addToFolder(req, res, item, folder) {
  const info = folder === 'uploads' || folder === 'savedItems' ? [item._id, item.category] : [item._id]
  const userId = req.currentUser._id
  
  User
    .findById(userId)
    .then(user => {
      user[folder].some(x => x[0].toString() === item._id.toString()) ? console.log('already added to your folder') : user[folder].push(info)
      return user.save()
    })
    .then(user => {
      res.send({ user: user, item: item })
    })
}

```

The function first determines if the item is an activity or a user. If it is an acivity, we store the `item.category` and it's individual `item._id`, if a user we simply store `item._id`. We then update the correct user folder, and in the process check if it is already in that folder, as not to create duplicates.


<h4>Secure Route</h4>

For every route which is only accessible by users stored into the database, we have specified another function to run beforehand. The `secureRoute`. This was an entirely separate file created to identify if a user was truly logged in. 

This function is a conditional statement to identify if a token has been issued. As mentioned beforehand, once a user is able to successfully log in, a JWT is returned as a response which is valid for six hours. 

  - Firstly, an identification if the correct type of token is available. We have chosen to use a Bearer token. At this stage, if a token has been issued but **IS NOT** a Bearer token, the user is invalid. 

```js
  if (!authToken || !authToken.startsWith('Bearer')) {
    return res.status(401).send({ message: 'Unauthorized no token' })
```

  - Once passed, the token itself still has the word ‘Bearer’ attached to it and is removed, leaving us with a pure JWT. Using the JWT method to verify the token, a user in the database is located and the request they are attempted to make can be accepted using `next()`.

<h4>Seeding the database</h4>

Having decided our models and created our endpoints, we could now focus on creating initial data for our app. This was implemented using a **seed file**. This file contained hard-coded Recipies, Games, TV Series, Films and Books which was planted into our MongoDB.

For every model in our collection, we assigned a user using a referenced relationship. Ultimately this would mean when feeding data into the database, a user needed to be attached to every activity we create.

To achieve this, once connecting to Mongo itself, a selection of users were pre-made and seeded to the database. 

After doing so, we could go on to make the four collections we designed using our models and assign a user to every activity by selecting one of users from the User array we just created. 

```js
      title: '1984',
      image: 'https://upload.wikimedia.org/wikipedia/en/c/c3/1984first.jpg',
      author: 'George Orwell',
      description: 'Winston Smith wrestles with oppression in Oceania, a place where the Party scrutinizes human actions with ever-watchful Big Brother. Defying a ban on individuality, Winston dares to express his thoughts in a diary and pursues a relationship with Julia. These criminal deeds bring Winston into the eye of the opposition, who then must reform the nonconformist',
      genre: ['Dystopian, Political fiction, Social Science'],
      bookType: 'Novel',
      rating: 4,
      user: users[0],
      category: 'Read'
```

Due to our database having multiple collections, we chose to separate seeding per collection into functions, which were called upon when seeding occured. This was also neccessary to be able to pass users through into every collection.

```js
      .then((users) => {
        console.log(users)
        seedFunction.createBooks(users)
```

A final aspect was also necessary at this stage, which was ensuring the activities associated to every user were also planted into their `uploads` array, which subsequently also runs when a user creates an activity in the app. Once a collection has seeded all the activities, it iterates through the collection and pushes the activities into the correct users `upload` array and saves the user back into the User collection.

**Run after every collection is seeded**
```js
      for (const item of output) {
        updateUpload(item)
      }
```
**Update User collection**
```js
function updateUpload(item) {

  const id = item.user._id
  const info = [item._id, item.category]
  User
    .findById(id)
    .then(user => {
      user.uploads.push(info)
      console.log(user.uploads)
      return user.save()
    })
    .catch(error => console.log(error))
}
```

## Frontend

Having successfully built our API and tested through Insomnia, we could now focus on designing our webpage which utilises our built API. Our frontend used the external library GSAP to create some of the animations on various pages. 

In total, we had a total of 21 components for our frontend, with four as a homepage for each of our collections and another four for individual activity rendering. 

### The NavBar 

This component utilised React Hooks and as a result meant that some of the components connected to it also used Hooks rather than classical or functional components and also enabled a cleaner code. 

1. The navigation bar held a number of functions which were determined to be run using turnaries. For instance, two functions handle the opening and closing of the navbar dependent on the onClick handler on the hamburger icon. These two functions also sets state of if the component is open or not. 

    ```js
    <div onClick={isOpen !== true ? HandleOpen : HandleClose} className="hamburger-container">
    ```

2. As shown below both the `HandleOpen` and `HandleClose` functions uses GSAP to manipulate the Navigation bar width and opacity and as a result we have a Navigation bar which renders differently depending on which function is run.  

    ```js

          const HandleOpen = (e) => {
          
            t1
              // (selector, duration, {css properties}, animationDelay) 
              .to('main', 0.5, { opacity: 0, ease: Power1.easeOut })
              .to('main', 0.1, { display: 'none', ease: Power1.easeOut })
              .to('.navbar', 0.3, { width: '34vw', ease: Power1.easeOut },'-=0.2')
              .fromTo('.items', 0.7, { display: 'none', opacity: 0, x: -50, ease: Power1.easeOut },
                { display: 'flex', opacity: 1, x: 0 })
              .fromTo('.options', { opacity: 0, x: -30, ease: Power1.easeOut },
                { opacity: 1, x: 0, stagger: 0.1, ease: Power1.easeIn }, '-=0.5')

            setState(true)
          }

          const HandleClose = () => {
            t1
              .fromTo('.items', 0.5, { dislay: 'flex', opacity: 1, x: 0, ease: Power1.easeOut },
                { display: 'none', opacity: 0, x: -50 })
              .to('.navbar', 0.3, { width: 0, ease: Power1.easeOut })
              .to('main', 0.1, { display: 'flex', ease: Power1.easeOut })
              .to('main', 0.3, { opacity: 1, ease: Power1.easeIn })
            setState(false)
          }
    ```

3. The navigation bar and a number of other components also renders different information for authorised and unauthorised users. For this component, the final link displays a logout rather than login for authorised users using a ternary operator on if a token is found in local storage: 

    ```js
              {!auth.isLoggedIn() ?
                <div className='options' onClick={ToggleModal}>
                  <li> 05. <span> LOGIN / </span> register </li>
                </div> :
                <div className='options' onClick={() => HandleLogout()} >
                  <li> 05. <span> LOGOUT </span>  </li>
                </div>}
    ```

4. We also decided to use a modal for users to login into the webpage and if they have not, they would be able to link through onto a page to register. This also utilised a turnerary operator depending on if a piece of state was true or false. A useState was defined for our model which originally is set to false, once the LOGIN element is clicked, the toggles the state to either be true or false. If true, the login modal will appear: 

    ```js
          {modalOpen ? <LoginModal
            ToggleModal={ToggleModal}
            props={props}
            HandleCloseFromLink={HandleCloseFromLink} /> : null}
    ```

### Forgotten Password

From the login modal, we have also implemented users who have registered to reset their password using a link. This link renders a new modal by where we use state to determine the content on the modal. The state `sent` is originally set to be false, meaning this would render: 

<img src='https://i.imgur.com/OKE3zqK.png' width='200'>

Once the submit button has been pressed after the user enters their email address, this triggers a function to the API endpoint `/api/forgotPassword` with the user's email. One of two things can now happen, the email is recognised into the database and the response is sent in email format to the user email. Or, if the email is not recognised, another piece of state named `returnError` is set to true and the following message would appear: 

```js
{returnError && <small style={{color: 'brown', position: 'absolute'}}>This email is not recognized. Please try again or register for new account</small>}
```

The email sent to the user contains a link to `/reset/THEIRPASSOWRDRESETTOKEN`.

From this page, the user is able to reset their password. However before doing so, as the page renders, a GET request is made to the reset endpoint on the api to ensure the link sent to the user is valid and if not, would turn a number of booleans true and prevent the user from updating their password and would be rendered with messages advising the user on the steps to take: 

```js
  componentDidMount() {
    console.log(this.props)
    axios
      .get('/api/reset', {
        params: {
          resetPasswordToken: this.props.match.params.resetPasswordToken
        }
      })
      .then(res => {
        console.log(res)
        if (res.data.message === 'password reset link verified') {
          this.setState({
            username: res.data.username,
            updated: false,
            error: false,
            expired: false,
            used: false

          })
        } else if (res.data.message === 'link has expired.') {
          this.setState({
            updated: false,
            error: false,
            expired: true,
            used: false
          })
        } else if (res.data.message === 'link already used.') {
          this.setState({
            updated: false,
            error: false,
            used: true
          })
        }
      })
      .catch(error => console.log(error))
  }

          {expired && !error && !used &&
            <>


              <div style={{color: 'white',width: '70%', textAlign: 'center'}}>The reset link has expired. Please request another via the link below.</div>
              <Link style={{color: 'lightskyblue'}} to={'/forgotPassword'}>Try again</Link>

            </>
          }
          {used &&
            <>
              <div style={{color: 'white', width: '70%', textAlign: 'center'}}>This link is no longer valid. Please request another below.</div>
              <Link style={{color: 'lightskyblue'}} to={'/forgotPassword'}>Try again</Link>

            </>
          }
          {error &&
            <>


              <div style={{color: 'white', width: '70%', textAlign: 'center'}}>Updating has not been possible at this time. Please request another link below or try again later.</div>
              <Link style={{color: 'lightskyblue'}} to={'/forgotPassword'}>Try again</Link>
            </>
          }
```

If these are passed, the page will prompt the user to enter a new password and check the password and the password confirmation fields match. Once this is passed and the form submitted successfully the user will be notified their password has changed and prompted to login. 



### Collection Homepages 

Per collection has its own page which can be accessed from the navbar and each has an individual layout. We decided as this would be a nice display for our users that each activity collection is unique. To do this, each collection has two components, the main homepage and a Single version, whereby a single activity would be rendered. 

For the purpose of explaining pages going forward, a focus will be made on the GAMES activities to explain some the functionalities available for authorised and unauthorised users. 

The Games homepage and for every homepage per collection, an axios request is made for the whole collection to be set into state. The whole collection can then be rendered on the page as the page loads. For every collection homepage, we also do an API request to the user that is currently logged in to access their savedItems array to determine which items they have already saved to render certain aspects differently:

```js
    axios.get('/api/play')
      .then(response => {
        this.setState({ games: response.data })
        // console.log(response.data)
      })
    axios.get(`/api/user/${userId}`)
      .then(response => {
        response.data.savedItems.map(el => {
          savedItems.push(el[0])
        })
        this.setState({ savedItems })
      })
```

### Single Activity 

Once one of the activities is clicked, this renders that particular activity. On the GAMES page, a call for an individual game is made on the page rendering using this.props and then passed down as props to the SingleGame component as well as additional functionality for authorised users. Because this page renders a single game  next to the full list of games, we simply rendered the SingleGame component on the collection page.

A similar approach is also taken for the other collections, except for the WATCH page which takes you to a new page and for the COOK page which uses GSAP to manipulate the card display to be shown and a request is made once the card is displayed. 

In terms of available functionality - a few ternary operators were issued to allow users who were logged in with more functionality when viewing single activities: 

-  Adding comments with a rating
-  Favoriting the Activity
-  Showing the user who uploaded the activity and a link to their profile. 

1. <p style='text-decoration: underline'>Adding comments with a rating<p>

In order to add any comments, a user needed to be authorised otherwise they would be asked to login or register to comment. However, all users are able to view the comments per activity For every comment, we also decided that users would be commenting on a particular activity with their own opinions. Because of this, we also added a rating functionality out of five which is only viewable with authorisation: 
  
  ```js

    <h6> {auth.isLoggedIn() ? 'COMMENT' : 'PLEASE LOGIN/REGISTER TO COMMENT'} </h6>

    {auth.isLoggedIn() ?
              <div className="comment-input">
                <form action="" onSubmit={(e) => HandleCommentSubmit(e)}>
                  <input placeholder='Write here...'></input>
                  <button style={{ marginBottom: '1px' }}> POST </button>
                </form>
              </div> : null}

  ```
  -  In order to add any comments, a user needed to be authorised otherwise they would be asked to login or register to comment. For every comment, we also decided that users would be commenting on a particular activity with their own opinions. Because of this, we also added a rating functionality out of five which is only viewable with authorisation: 

```js
<ion-icon onClick={(e) => HandleStar(e)} name="star-sharp"></ion-icon>

  const HandleStar = (e) => {
    if (e.target.style.color === 'white') {
      e.target.style.color = 'gold'
    } else {
      e.target.style.color = 'white'
    }

  }

  const HandleCommentSubmit = (e) => {
    e.preventDefault()
    const id = props.history.currentGame
    console.log(id)
    let rating = 0
    const stars = Array.from(e.target.parentNode.previousSibling.lastChild.childNodes)
    // stars gets the stars in the comment section

    stars.map(el => {
      el.style.color === 'gold' ? rating = rating + 1 : null
    })

    stars.map(el => {
      el.style.color = 'white'
    })

    const reqBody = {
      text: e.target.firstChild.value,
      rating: rating
    }

    axios.post(`/api/play/${id}/comments`,
      reqBody, { headers: { Authorization: `Bearer ${auth.getToken()}` } })

    e.target.firstChild.value = ''

    setTimeout(() => {
      RenderComments()
    }, 500)

  }

```
2. <p style='text-decoration: underline'>Favoriting the Activity<p>

- Authorised users also have the functionality to be able to favourite all the activities that are on the webpage. To enable this, a white heart is available per activity and if pressed will turn red, indicating it is favorited. The heart would only be visible if a user is authorised and is deployed using a ternary operator. Once this heart has been clicked, the `handleFavourite` function runs by which a POST request is made to the single activity endpoint which stores what users have favourited the activity. If this pressed again, a DELETE request would be made to be user who is logged in and removes the activity from their saved items folder: 

```js
{auth.isLoggedIn() ? <ion-icon style={savedItems.includes(props.history.currentGame) ? { color: 'red' } : { color: 'white' }}
onClick={(e) => HandleFavourite(e)} name="heart-sharp"></ion-icon> : null}

  const HandleFavourite = (e) => {
    const id = props.history.currentGame
    const t1 = new TimelineLite
    if (e.target.style.color === 'white') {
      e.target.style.color = 'red'
      t1
        .to('.heart-message', 0.2, { opacity: 0.9 })
        .to('.heart-message', 0.5, { opacity: 0 }, '+=1')
      axios.post(`api/play/${id}`, {}, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      setTimeout(() => {
        RenderComments()
      }, 500)
    } else {
      e.target.style.color = 'white'
      axios.delete(`/api/user/${auth.getUserId()}/savedItems/play/${id}`
        , { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      setTimeout(() => {
        RenderComments()
      }, 500)
    }
  }
```

3. <p style='text-decoration: underline'>Showing the user who uploaded the activity and a link to their profile<p>

- We also decided that unless you were an authorised user, the creator of activities would remain hidden and subsequently a link wouldn’t be provided to view their profile:

```js

<small> Added By: {auth.isLoggedIn() ? <Link style={{textTransform:'capitalize'}}to={`/user/${singleGame.user._id}`}> {singleGame.user.username} </Link> :
'Please login to view the uploader\'s profile'} </small>
```


### Add Items

An additional piece of functionality available for authorised users is contributing activities to the current database. This would mean creating forms per collection and filling the form out to be accepted inline with the Schemas we created in the backend. In total, there were four forms. By using a ternary operator, we were able to use a single component to render the correct form by users choosing the correct option: 

```js
            <form onSubmit={(e) => this.HandleItemPost(e)} onChange={(e) => this.HandleChange(e)} action="">
              {current ? (current.innerHTML === 'Film' || current.innerHTML === 'TV Series') ?
                <WatchForm current={this.myRef} /> : current.innerHTML === 'Cook' ? <CookForm />
                  : current.innerHTML === 'Play' ? <GameForm />
                    : current.innerHTML === 'Read' ? <ReadForm /> : null : null}
              <button> SUBMIT </button>
            </form>
```

### Profile 

Every authorised user is automatically given a profile once they have created an account, here users are shown what items they have uploaded and favourited. They also showed what users they follow and are following them. 

1. <p style='text-decoration: underline'>Uploads<p>

  If a user has created an item, from this endpoint they also have the power to edit or delete that activity. The edit functionality redirects the user to the appropriate form with the pre-loaded data where they can edit the item and send a POST request to the activity endpoint. A similar action also occurs on the DELETE button, whereby a DELETE request is made to the current user's uploads folder to delete that particular id. 



    {isProfile && <Link to={`/user/${userId}/uploads/${upload.category}/${upload._id}`}> Edit</Link>}
    {isProfile && <button id={upload.category} onClick={(e) => this.handleDeleteItem(e)} >Delete</button>}

      handleDeleteItem(e) {
        e.preventDefault()
        const token = auth.getToken()
        const id = auth.getUserId()
        const userId = this.props.match.url
        const category = e.target.id
        const itemId = e.target.parentNode.parentNode.firstChild.id

        axios.delete(`/api${userId}/uploads/${category}/${itemId}`, { headers: { authorization: `Bearer ${token}` } })
          .then(res => {
            location.reload()
          })
          .catch(error => console.log(error))
      }

2. <p style='text-decoration: underline'>Following Users<p>

  Now that users have been authorised, they have the ability to view other users profiles when browsing through the webpage and to also follow a user if they want to. 

  This is implemented through first disguishing if the profile being viewed is the current user. If not, the following buttons are rendered prompting either a POST or DELETE request to the current users following folder: 

    {!isProfile && !follow && <button onClick={() => this.followUser()}>Follow</button>}
    {!isProfile && follow && <button onClick={() => this.unfollowUser()}>Unfollow</button>}


## Screenshots

<div style=text-align:center>
<img src='https://i.imgur.com/sa5lNFf.jpg' width='200' height='100'>
<img src='https://i.imgur.com/VOn1gZv.png' width='200' height='100'>
<img src='https://i.imgur.com/mJyb9g6.png' width='200' height='100'>
<img src='https://i.imgur.com/1wSRzNP.png' width='200' height='100'>
<img src='https://i.imgur.com/GPYt1om.png' width='200' height='100'>
<img src='https://i.imgur.com/MbsBT5H.png' width='200' height='100'>
<img src='https://i.imgur.com/aFdS7Qd.png' width='200' height='100'>
<img src='https://i.imgur.com/LbqdTWq.png' width='200' height='100'>
<img src='https://i.imgur.com/1oYSsOD.png' width='200' height='100'>
<img src='https://i.imgur.com/emsFL2V.png' width='200' height='100'>
<img src='https://i.imgur.com/eqyMApE.png' width='200' height='100'>
<img src='https://i.imgur.com/rb1V5xo.png' width='200' height='100'>

</div>

## Potential Future Features 

- At the moment the webpage is not mobile friendly due to time restraints. We would hope to apply this in the future to give users the ability to access the app on a tablet or a phone.

- User deleting an account. Althought users are able to create an account on the database, we do not have a feature if they would like to be removed. 

## Lessons Learned

- Plan all functions early. Although the backend was one of the first things we decided to do, we implemented a lot of additional features that we hadn't originally thought of during development. This would mean we could've allocated time more accordingly. 

- Seed your database early. We were lucky that we created a seed file early on. Doing so meant that we could plant the default information with two commands making it very easy to test and visually see how the data was being displayed. 












